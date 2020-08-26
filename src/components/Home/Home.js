import React from 'react';

import useFetch from '../../hooks/useFetch.js';
import Day from '../Day/Day.js';

import styles from './Home.module.css';

const Home = () => {
    const results = useFetch("https://api.openweathermap.org/data/2.5/forecast?q=Santiago&units=metric&appid=c974f712cfab72f32983c073239c2ebf", {});

    return (
        <div className="container">
            <h1 className={styles.santiagoTitle}>Santiago, Chile</h1>
            <div className="d-flex flex-row flex-wrap">
                {
                    results.response && results.response.days.map((item) => (
                        <Day key={item.date} avgTemp={item.temp.avg} maxTemp={item.temp.max} 
                             minTemp={item.temp.min} date={item.date}></Day>
                    ))
                }  
            </div>
        </div>
    );
}

export default Home;