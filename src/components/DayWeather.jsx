import React from 'react'

export default function DayWeather({date,averagetemp,mintemp_c,maxtemp_c,onClick}) {
    return (
        <div className="card" onClick={onClick}>
            <div className="info">
                <div className="date">
                    {date}
                </div>
                <div className="average">
                <h1> {averagetemp} °C</h1>
                </div>
                <div className="min_max">
                    <p className="temp">min {mintemp_c} °C</p>
                    <p className="temp">max {maxtemp_c} °C</p>
                </div>
            </div>
        </div>
    )
}
