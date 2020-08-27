import React from 'react';
import { Link } from "react-router-dom";

import styles from './Detail.module.css';

import Day from '../Day/Day.js';
import { getIcon, getHourFromUnixTime } from '../../utils/utils.js';

const DetailContainer = (props) => {
    const item = props.location.state?.item;
    return (
        <div>
            {
                item ? 
                    <div className={`container ${styles.detailContainer}`}>
                        <h1 className={styles.dateTitle}>{item.date}</h1>
                        <hr className="hrLine"></hr> 
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {
                                item.values.map(data => (
                                    <Day key={data.dt} avgTemp={data.main.temp} maxTemp={data.main.temp_max}  date={data.date}
                                    minTemp={data.main.temp_min} icon={getIcon(data.weather[0].icon)} customClass="dayItem"
                                    time={getHourFromUnixTime(data.dt)}></Day>
                                ))
                            }
                        </div>
                        <div>
                            <Link to="/">
                                <button type="button" className={`btn btn-primary ${styles.goBackButton}`}>Go Back</button>
                            </Link>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default DetailContainer;