import React from 'react';

import styles from './Detail.module.css';

const DetailContainer = (props) => {
    const item = props.location.state?.item;
    return (
        <div>
            {
                item ? 
                <div className={`container ${styles.detailContainer}`}>
                    <h3>{item.id}</h3> 
                </div>
                : null
            }
        </div>
    )
}

export default DetailContainer;