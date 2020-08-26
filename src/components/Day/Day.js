import React from 'react';
import styles from './Day.module.css';

const Day = (props) => {
    return (
        <div className="p-3 d-flex flex-column align-items-center">
            <h3>{props.date}</h3>
            <i className={`wi ${props.icon} ${styles.weatherIcon}`}></i>
            <h3>Max: {props.maxTemp}</h3>
            <h3>Min: {props.minTemp}</h3>
        </div>
    );
}

export default Day;