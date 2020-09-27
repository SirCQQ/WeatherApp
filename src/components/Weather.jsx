import React, { Component } from 'react'
import "./Weather.style.css"
import sun_svg from "../assets/Sun2.svg"
import moon_svg from "../assets/Moon.svg"
import rain_svg from "../assets/Rain.svg"
const weather_api = {
    key: "a0f4ca8c617f4412a9a124138202709",
    current: "http://api.weatherapi.com/v1/current.json?key=a0f4ca8c617f4412a9a124138202709&q=",
    forecast: "http://api.weatherapi.com/v1/forecast.json?key=a0f4ca8c617f4412a9a124138202709&q=",
    days_forecast: "&days=7"
}

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // weather_info: {},
            is_day: true,
            

        }
        this.getCurrentWeather = this.getCurrentWeather.bind(this);
    }
    componentDidMount() {
        let getWeather = this.getCurrentWeather;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let coords = `${position.coords.latitude},${position.coords.longitude}`
                console.log(coords)
                getWeather(coords, "forecast");
            });
        }
    }
    getCurrentWeather(location, type = "current") {
        let URL;
        if (type === "current") {
            URL = weather_api.current + location;
        }
        if (type === "forecast") {
            URL = weather_api.forecast + location + weather_api.days_forecast;
        }
        fetch(URL)
            .then(resp => resp.json())
            .then(data => {
                let {
                    location, current, forecast
                } = data
                console.log(location, current, forecast)
                let time = new Date(location.localtime);
                let current_day=forecast.forecastday[0].day
                // time.setUTCSeconds(location.localtime_epoch);
                console.log(time)
                const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
                let time_stamp=`${days[time.getUTCDay()]}, ${months[time.getMonth()]} ${time.getDate()}`
                console.log("current day",current_day)
                let {region}=location;
                let { is_day,temp_c}=current;
                this.setState({
                    is_day:is_day,
                    // // rain: false,
                    region: region,
                    temp_c: temp_c,
                    maxtemp_c:current_day.maxtemp_c,
                    mintemp_c:current_day.mintemp_c,
                    time_stamp:time_stamp
                    // min_temp: null,
                    // max_temp: null,
                    // time: null
                })
            })
    }

    render() {
        const { is_day, rain, temp_c ,region,maxtemp_c,mintemp_c,time_stamp } = this.state
        console.log(this.state)
        return (
            <div className={`container ${is_day ? "day" : "night"} ${rain ? "rain" : ""}`}>
                <header className="header">
                    <div className="hamburger"></div>
                    <div className="current-date">{time_stamp}</div>
                    <div className="space"></div>
                </header>
                <section className="weather_info">
                    <div className="info">
                        <h3 className="city">{region}</h3>
                        <h1 className="temperature">{temp_c} <span>°C</span></h1>
                        <div className="min_max">
                            <h5 className="temp"><span>min</span> {mintemp_c} °C</h5>
                            <h5 className="temp"><span>max</span> {maxtemp_c} °C</h5>
                        </div>
                    </div>
                    <img className={`img ${!rain ? "rotate" : ""}`} src={rain ? rain_svg : (is_day ? sun_svg : moon_svg)} alt="day-type" />
                </section>
                
            </div>
        )
    }
}



export default Weather;