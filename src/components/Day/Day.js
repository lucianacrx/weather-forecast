import React from 'react';

const Day = (props) => {
    return (
        <div className="p-2">
            <h3>{props.avgTemp}</h3>
        </div>
    );
}

export default Day;