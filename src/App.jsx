import React,{useState, useEffect} from 'react';
// import weather_logo from "./assets/"
// const api={
//   key:"1be2c4d07609aae509f5688295992ea1",
//   api:"https://api.openweathermap.org/date/2.5/"
// };

const weather_api={
  key:"a0f4ca8c617f4412a9a124138202709",
  link:"http://api.weatherapi.com/v1/current.json?key=a0f4ca8c617f4412a9a124138202709&q=",
  link2:"http://api.weatherapi.com/v1/forecast.json?key=a0f4ca8c617f4412a9a124138202709&q=47.17,27.6"}

function App() {
  const [weatherInfo,setWeatherInfo]=useState({})

  const  getCurrentWeather=(location)=>{
    fetch(weather_api.link+location)
    .then(resp=>resp.json())
    .then(data=>{
      setWeatherInfo(data);
      console.log(data)
    })
  }

 { if ("geolocation" in navigator && weatherInfo==={}) {
    console.log("Available");
    navigator.geolocation.getCurrentPosition(function(position) {
      
    let coords=`${position.coords.latitude},${position.coords.longitude}`
      console.log(coords)
      // getCurrentWeather(coords);
  });
} else {
  console.log("Not Available");
}}
  useEffect(()=>{
    
  },[])

  return (
    <div className="app cold">
      <main>
        <button onClick={()=>{

          getCurrentWeather("iasi")
          console.log()
        }
        }>GetWeather</button>
        <button>Show Weather</button>
          {/* {weatherInfo && <p>{JSON.stringify(weatherInfo)}</p>} */}
      </main>
    </div>
  );
}

export default App;
