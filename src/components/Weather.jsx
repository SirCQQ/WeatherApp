import React, { Component } from 'react'
import "./Weather.style.css"
import sun_svg from "../assets/Sun2.svg"
import moon_svg from "../assets/Moon.svg"
import rain_svg from "../assets/Rain.svg"
import DayWeather from './DayWeather'
import HourWeather from "./HourWeather"
const weather_api = {
    key: "a0f4ca8c617f4412a9a124138202709",
    current: "https://api.weatherapi.com/v1/current.json?key=a0f4ca8c617f4412a9a124138202709&q=",
    forecast: "https://api.weatherapi.com/v1/forecast.json?key=a0f4ca8c617f4412a9a124138202709&q=",
    days_forecast: "&days=10"
}

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // weather_info: {},
            is_day: true,
            region: null,
            temp_c: null,
            maxtemp_c: null,
            mintemp_c: null,
            time_stamp: null,
            forecast: null,
            day_index:0,
            permision:true,
            permision_status:false
        }
        this.getCurrentWeather = this.getCurrentWeather.bind(this);
        this.getPermision = this.getPermision.bind(this);
    }
    componentDidMount() {
        let getWeather = this.getCurrentWeather;
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let coords = `${position.coords.latitude},${position.coords.longitude}`
                getWeather(coords, "forecast");
            });
        }
        this.getPermision();
    }
    convertDay(localtime){
        let time=new Date(localtime)
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let time_stamp=`${days[time.getUTCDay()]}, ${months[time.getMonth()]} ${time.getDate()}`
        return time_stamp
    }

    convertHour(localtime){
        let time=new Date(localtime)
        return time.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
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
                let time_stamp = this.convertDay(location.localtime);
                let current_day=forecast.forecastday[0].day;
                let {region}=location;
                let { is_day,temp_c}=current;
                
                this.setState({
                    is_day:is_day,
                    region: region,
                    temp_c: temp_c,
                    maxtemp_c:current_day.maxtemp_c,
                    mintemp_c:current_day.mintemp_c,
                    time_stamp:time_stamp,
                    forecast:[...forecast.forecastday]
                })
            })
    }
     getPermision(){
        if(!this.state.permision_status)
        {
        navigator.permissions.query({ name: 'geolocation' }).then(
            resp=>{
                // console.log(typeof(resp.state))
                if(resp.state==="denied"){
                    this.setState({permision:false,permision_status:true})
                }
                else{
                    this.setState({permision:true,permision_status:true})

                }
            }
        )
}
    }

    render() {
        const { is_day, rain, temp_c ,region,maxtemp_c,mintemp_c,time_stamp } = this.state
        let weather_app=(
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
                <section className="cards">
                    {this.state.forecast && this.state.forecast.map((day,index)=>{
                        return <DayWeather 
                        key={day.date}
                        date={this.convertDay(day.date)} 
                        averagetemp={day.day.avgtemp_c}
                        mintemp_c={day.day.mintemp_c}
                        maxtemp_c={day.day.maxtemp_c}
                        onClick={()=>{
                            console.log("clicked")
                            this.setState({day_index:index})
                        }}
                        />
                    })}
                </section>
                <section className="cards">
                    {this.state.forecast && this.state.forecast[this.state.day_index].hour.map(hour=>{
                       return <HourWeather 
                       key={hour.time}
                        time={this.convertHour(hour.time)}
                        temp={hour.temp_c}
                        img={hour.condition.icon}
                       /> 
                    })}
                </section>
            </div>
        )
        // let permision = this.getPermision()
        // console.log(this.state.permision)
        return this.state.permision? weather_app : <div className="container day no_access"><p>You need to allow the locations</p></div>
    }
}



export default Weather;