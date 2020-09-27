import React from 'react'

function HourWeather({ time, temp, img }) {
    return (
        <div className="small-card">
            <h4>{time}</h4>
            <h4>{temp}°C</h4>
            <img src={img} alt="weather" />
        </div>
    )
}

export default HourWeather
