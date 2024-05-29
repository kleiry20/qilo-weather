import { useEffect, useState } from "react";
import "./WeatherDashboard.css";
import Card from "../Card/Card";

import SearchBar from "../SearchBar/SearchBar";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

const WeatherDashboard = (props) => {
  const { city, setCity, apiKey } = props;

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  const current_weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const average_weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${apiKey}`;

  // useEffect(() => {
  //   async function fetchCurrentWeather() {
  //     try {
  //       const request = await fetch(current_weather_url);
  //       const response = await request.json();

  //       if (response.cod === "404") {
  //         setCurrentWeatherData(null);
  //       } else {
  //         const result = {
  //           place: response.name,
  //           weather: response.weather[0],
  //           currTemp: response.main.temp,
  //           maxTemp: response.main.temp_max,
  //           minTemp: response.main.temp_min,
  //           feelsLike: response.main.feels_like,
  //           humidity: response.main.humidity,
  //           pressure: response.main.pressure,
  //         };
  //         setCurrentWeatherData(result);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchCurrentWeather();

  //   async function fetchWeeklyWeatherData() {
  //     try {
  //       const request = await fetch(average_weather_url);
  //       const response = await request.json();

  //       if (response.cod === "404") {
  //         setWeeklyData(null);
  //       } else {
  //         const avgTemp = response.list.reduce(
  //           (acc, curVal) => acc + curVal.main.temp,
  //           0
  //         );
  //         const filterVals = response.list.filter((a) => a.rain != undefined);
  //         const size = filterVals.length;
  //         const sum = filterVals.reduce(
  //           (acc, curr) => acc + curr.rain["3h"],
  //           0
  //         );
  //         const avgRainfall = sum / size;
  //         const avgHumidity = response.list.reduce(
  //           (acc, curVal) => acc + curVal.main.humidity,
  //           0
  //         );
  //         const result = {
  //           avgTemp: (avgTemp / 7).toFixed(2),
  //           avgRainfall: isNaN(avgRainfall.toFixed(2))
  //             ? 0
  //             : avgRainfall.toFixed(2),
  //           avgHumidity: (avgHumidity / 7).toFixed(2),
  //           tempTitle: "Average Temp of the Week",
  //           rainfallTitle: "Average Rainfall of the Week",
  //           humidityTitle: "Average Humidity of the Week",
  //         };
  //         setWeeklyData(result);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchWeeklyWeatherData();
  // }, [city]);

  function capitalizeFirstLetter(word) {
    const words = word.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalizedWord = capitalizedWords.join(" ");
    return capitalizedWord;
  }

  return (
    <div className="weather-dashboard">
      <h2>Weather App</h2>
      <a href="/notepad">Go to Notepad</a>
      {weeklyData != null ? (
        <>
          <SearchBar city={currentWeatherData.place} setCity={setCity} />
          <h3>{capitalizeFirstLetter(currentWeatherData.place)}</h3>
        </>
      ) : (
        <>
          <SearchBar city={"Delhi"} setCity={setCity} />
          <p>Invalid city name, please try again!</p>
        </>
      )}

      <div className="weather-row">
        {weeklyData != null && currentWeatherData != null ? (
          <>
            <Card
              title="Average Temp of the Week"
              value={`${weeklyData.avgTemp} \u00b0 C`}
            />
            <Card
              title="Average Rainfall of the Week"
              value={`${weeklyData.avgRainfall} mm`}
            />
            <Card
              title="Average Humidity of the Week"
              value={`${weeklyData.avgHumidity} %`}
            />
            <Card
              title="Current Temperature"
              value={`${currentWeatherData.currTemp} \u00b0 C`}
            />
          </>
        ) : (
          <ErrorComponent />
        )}

        {/* {staticData.map((item, index) => (
          <React.Fragment key={index}>
            <Card currentWeatherData={currentWeatherData} item={item} />
          </React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default WeatherDashboard;
