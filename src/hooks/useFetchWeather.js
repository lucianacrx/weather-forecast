import React, { useEffect, useState } from 'react';

import { formatDate, getNextDays, getIcon, getWeekDay } from '../utils/utils.js';

const useFetchWeather = (url, options) => {
    const [mappedDays, setMappedDays] = useState(null);
    const [fullDaysData, setFullDaysData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          fetch(url, options)
            .then(results => results.json())
            .then(data => {
              const result = mapResponse(data);
              setMappedDays(result[0]);
              setFullDaysData(result[1]);
            });
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { mappedDays, fullDaysData, error };
};

function mapResponse(data) {
  var days = {};

  days = getDaysData(data.list);

  return days;
}

function getDaysData(data) {
  var comingDays = getNextDays(new Date());
  var daysMapped = [];
  var fullDaysData = [];

  // Getting data from each day
  comingDays.forEach((day, index) => {
      var dayData = data.filter(item => item.dt_txt.includes(day));
      
      if (dayData.length > 0) {
        var dayMapped = {};
        dayMapped.id = index + 1;
        dayMapped.date = formatDate(dayData[0].dt);
        dayMapped.day = getWeekDay(dayData[0].dt).toLowerCase();
        var icon = "";
        // Se toma como referencia un punto medio en el día, si solo existe un registro (por la hora) se toma ese.
        if (dayData.length/2 >= 1) {
          const middleIndex = Math.floor(dayData.length/2);
          dayMapped.description = dayData[middleIndex].weather[0].description;
          icon = dayData[middleIndex].weather[0].icon;
        } else {
          dayMapped.description = dayData[0].weather[0].description;
          icon = dayData[0].weather[0].icon;
        }
        
        dayMapped.iconClass = getIcon(icon);
        dayMapped.temp = {};
        const mainTemp = dayData.map(day => { return day.main.temp;});
        const minTemp = dayData.map(day => { return day.main.temp_min;});
        const maxTemp = dayData.map(day => { return day.main.temp_max;});
        dayMapped.temp.avg = Math.round(mainTemp.reduce((a, b) => a + b) / mainTemp.length);
        dayMapped.temp.min = Math.round(minTemp.reduce((a, b) => a + b) / minTemp.length);
        dayMapped.temp.max = Math.round(maxTemp.reduce((a, b) => a + b) / maxTemp.length);

        // Days mapped contiene la data con los calculos necesarios para el avg requerido
        // FullDays se utilizará para no tener que realizar otra consulta al ver el detalle de un día
        daysMapped.push(dayMapped);
        const fullDay = {};
        fullDay.id = index + 1;
        fullDay.date = formatDate(dayData[0].dt);
        fullDay.values = dayData;
        fullDaysData.push(fullDay);
    }
  });

  return [daysMapped, fullDaysData];
}

export default useFetchWeather;