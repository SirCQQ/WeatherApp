import React from 'react';
import ReactDOM from 'react-dom';
import Weather from "./components/Weather"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Weather />
  </React.StrictMode>,
  document.getElementById('root')
);
