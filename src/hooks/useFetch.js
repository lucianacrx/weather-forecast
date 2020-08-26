import React, { useEffect, useState } from 'react';

import { formatDate, getNextDays } from '../utils/utils.js';

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          fetch(url, options)
            .then(results => results.json())
            .then(data => {
              const result = mapResponse(data);
              setResponse(result);
            });
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error };
};

function mapResponse(data) {
  const mapped = {};

  mapped.days = mapDays(data.list);

  return mapped;
}

function mapDays(data) {
  var comingDays = getNextDays(new Date());
  var daysMapped = [];

  // Getting data from each day
  comingDays.forEach(day => {
    var dayData = data.filter(item => item.dt_txt.includes(day));
    var dayMapped = {};
    dayMapped.date = formatDate(dayData[0].dt); 
    dayMapped.temp = {};
    const mainTemp = dayData.map(day => { return day.main.temp;});
    const minTemp = dayData.map(day => { return day.main.temp_min;});
    const maxTemp = dayData.map(day => { return day.main.temp_max;});
    dayMapped.temp.avg = mainTemp.reduce((a, b) => a + b) / mainTemp.length;
    dayMapped.temp.min = minTemp.reduce((a, b) => a + b) / minTemp.length;
    dayMapped.temp.max = maxTemp.reduce((a, b) => a + b) / maxTemp.length;

    daysMapped.push(dayMapped);
  });

  return daysMapped;
}

export default useFetch;