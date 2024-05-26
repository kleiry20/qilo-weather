import React from "react";
import "./WeatherDashboard.css";
import Card from "../Card/Card";

const WeatherDashboard = () => {
  const weatherData = [
    {
      title: "Average Temp of the Week",
    },
    {
      title: "Average Rainfall of the Week",
    },
    {
      title: "Average Humidity of the Week",
    },
    {
      title: "Current Temperature",
    },
  ];

  return (
    <div className="weather-dashboard">
      <h2>Weather App</h2>
      <div className="weather-row">
        {weatherData.map((item, index) => (
          <React.Fragment key={index}>
            <Card item={item} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
