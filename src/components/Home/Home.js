import React from 'react';
import { Link } from "react-router-dom";

import useFetchWeather from '../../hooks/useFetchWeather.js';
import Day from '../Day/Day.js';
import LineChartHome from '../LineChart/LineChartHome.js';

import styles from './Home.module.css';

const Home = () => {
    const results = useFetchWeather("https://api.openweathermap.org/data/2.5/forecast?q=Santiago&units=metric&appid=c974f712cfab72f32983c073239c2ebf", {});

    return (
        <div className={`container ${styles.mainContainer}`}>
            <h1 className={styles.santiagoTitle}>Santiago, Chile</h1>
            <hr className="hrLine" />
            <div className="d-flex flex-row flex-wrap justify-content-center">
                {
                    results.mappedDays && results.fullDaysData && results.mappedDays.map((item) => (
                        <Link className={styles.dayItem} key={item.id}
                        to={{ pathname: `/${item.day}`, state: { item: results.fullDaysData.find(p => p.id === item.id) } }} >
                            <Day avgTemp={item.temp.avg} maxTemp={item.temp.max} 
                             minTemp={item.temp.min} date={item.date} icon={item.iconClass}></Day>
                        </Link>
                    ))
                }  
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                {
                    results.mappedDays ? 
                    <div className={styles.svgBox}>
                        <LineChartHome data={results.mappedDays}/>
                    </div> : null
                }
            </div>
        </div>
    );
}

export default Home;