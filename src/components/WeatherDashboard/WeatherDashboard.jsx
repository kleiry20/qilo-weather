import { useEffect, useState } from "react";
import "./WeatherDashboard.css";
import Card from "../Card/Card";

import SearchBar from "../SearchBar/SearchBar";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import MinMaxTemp from "../MinMaxTemp/MinMaxTemp";
import Quote from "../Quote/Quote";
import BarChart from "../BarChart/BarChart";
import { FaHeart } from "react-icons/fa";

const WeatherDashboard = (props) => {
  const { city, setCity, apiKey } = props;

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [data, setData] = useState();

  const current_weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const average_weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${apiKey}`;

  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        const request = await fetch(current_weather_url);
        const response = await request.json();

        if (response.cod === "404") {
          setCurrentWeatherData(null);
        } else {
          const result = {
            place: response.name,
            weather: response.weather[0],
            currTemp: parseInt(response.main.temp),
            maxTemp: response.main.temp_max,
            minTemp: response.main.temp_min,
            feelsLike: parseInt(response.main.feels_like),
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            icon: response.weather[0].icon,
            description: response.weather[0].main,
          };
          setData(response);
          setCurrentWeatherData(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrentWeather();

    async function fetchWeeklyWeatherData() {
      try {
        const request = await fetch(average_weather_url);
        const response = await request.json();

        if (response.cod === "404") {
          setWeeklyData(null);
        } else {
          const avgTemp = response.list.reduce(
            (acc, curVal) => acc + curVal.main.temp,
            0
          );
          const filterVals = response.list.filter((a) => a.rain != undefined);
          const size = filterVals.length;
          const sum = filterVals.reduce(
            (acc, curr) => acc + curr.rain["3h"],
            0
          );
          const avgRainfall = sum / size;
          const avgHumidity = response.list.reduce(
            (acc, curVal) => acc + curVal.main.humidity,
            0
          );
          const result = {
            avgTemp: parseInt(avgTemp / 7),
            avgRainfall: isNaN(avgRainfall) ? 0 : parseInt(avgRainfall),
            avgHumidity: parseInt(avgHumidity / 7),
            tempTitle: "Average Temp of the Week",
            rainfallTitle: "Average Rainfall of the Week",
            humidityTitle: "Average Humidity of the Week",
          };
          setWeeklyData(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchWeeklyWeatherData();
  }, [city]);

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
      <div className="weather-header">
        <h2
          style={{ display: "flex", alignItems: "center", fontWeight: "300" }}
        >
          <i className="icon-style rotate">🌍</i>
          Weather App
        </h2>
        <a href="/notepad">Go to Notepad</a>
      </div>

      <div className="weather-content">
        {currentWeatherData != null ? (
          <div className="search-div">
            <SearchBar city={city} setCity={setCity} />
            <div className="current-city">
              <h3 className="current-weather">{capitalizeFirstLetter(city)}</h3>
              <p className="current-weather">
                {Math.round(currentWeatherData.currTemp)}&deg;
              </p>

              <div className="weather-div">
                <img
                  className="current-weather-icon"
                  src={`https://openweathermap.org/img/wn/${currentWeatherData.icon}@2x.png`}
                  alt="weatherIcon"
                />
              </div>
            </div>

            {/* card row */}
            <div className="weather-row2">
              {weeklyData != null && currentWeatherData != null ? (
                <>
                  <Card
                    title="Weekly Average Temp"
                    value={`${weeklyData.avgTemp} \u00b0 C`}
                  />
                  <Card
                    title="Weekly Average Rainfall"
                    value={`${weeklyData.avgRainfall} mm`}
                  />

                  <Card
                    title="Weekly Average Humidity"
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
            </div>

            <div className="extra-info">
              {/* temp throughout the day */}
              <div className="child-card-temp-div">
                <h4 className="child-card--title">Weather Forecast</h4>
                <div className="child-temp-data">
                  <MinMaxTemp city={city} apiKey={apiKey} data={data} />
                </div>
              </div>

              {/* Quote */}
              <Quote />
            </div>

            {/* Bar Chart */}
            <BarChart apiKey={apiKey} city={city} />

            {/* footer */}
            <p className="love">
              Made with <FaHeart style={{ color: "#9b2323" }} /> by{" "}
              <a href="https://github.com/kleiry20" target="_blank">
                Anushka
              </a>
            </p>
          </div>
        ) : (
          <div className="search-div">
            <SearchBar city={"Delhi"} setCity={setCity} />
            <p style={{ textAlign: "center" }}>
              Invalid city name, please try again!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
