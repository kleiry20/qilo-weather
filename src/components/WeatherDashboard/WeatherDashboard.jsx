import { useEffect, useState } from "react";
import "./WeatherDashboard.css";
import Card from "../Card/Card";

import SearchBar from "../SearchBar/SearchBar";

const WeatherDashboard = (props) => {
  const { city, setCity, apiKey } = props;

  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isWeekly, setIsWeekly] = useState(false);
  const [isDaily, setIsDaily] = useState(false);

  const [weeklyData, setWeeklyData] = useState();
  const [finalArr, setFinalArr] = useState();

  const staticData = [
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

  const current_weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const average_weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${apiKey}`;

  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        const request = await fetch(current_weather_url);
        const response = await request.json();

        const result = {
          place: response.name,
          weather: response.weather[0],
          currTemp: response.main.temp,
          maxTemp: response.main.temp_max,
          minTemp: response.main.temp_min,
          feelsLike: response.main.feels_like,
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          title: "Current Temperature",
        };
        setCurrentWeatherData(result);
        setIsDaily(true);
      } catch (error) {
        console.error(error);
      }
    }
    // fetchCurrentWeather();

    async function fetchWeeklyWeatherData() {
      try {
        const request = await fetch(average_weather_url);
        const response = await request.json();

        const avgTemp = response.list.reduce(
          (acc, curVal) => acc + curVal.main.temp,
          0
        );
        const filterVals = response.list.filter((a) => a.rain != undefined);
        const size = filterVals.length;
        const sum = filterVals.reduce((acc, curr) => acc + curr.rain["3h"], 0);
        const avgRainfall = sum / size;
        const avgHumidity = response.list.reduce(
          (acc, curVal) => acc + curVal.main.humidity,
          0
        );
        const result = {
          avgTemp: (avgTemp / 7).toFixed(2),
          avgRainfall: avgRainfall.toFixed(2),
          avgHumidity: (avgHumidity / 7).toFixed(2),
          tempTitle: "Average Temp of the Week",
          rainfallTitle: "Average Rainfall of the Week",
          humidityTitle: "Average Humidity of the Week",
        };
        setWeeklyData(result);
        setIsWeekly(true);
      } catch (error) {
        console.error(error);
      }
    }
    // fetchWeeklyWeatherData();
    currentWeatherData &&
      weeklyData &&
      setFinalArr(...finalArr, currentWeatherData, weeklyData);
  }, []);

  // const finalResult = [...currentWeatherData, ...weeklyData];
  // console.log(finalResult);
  finalArr && console.log("finalarrrr", finalArr);

  return (
    <div className="weather-dashboard">
      <h2>Weather App</h2>
      <SearchBar city={city} setCity={setCity} />
      <div className="weather-row">
        {/* {currentWeatherData != null &&
          weeklyData != null &&
          weatherData.map((item, index) => (
            <React.Fragment key={index}>
              <Card
                currentWeatherData={currentWeatherData}
                dummy={dummy}
                item={item}
              />
            </React.Fragment>
          ))} */}

        <Card weeklyData={weeklyData} isWeekly={isWeekly} />
        <Card weeklyData={weeklyData} isWeekly={isWeekly} />
        <Card weeklyData={weeklyData} isWeekly={isWeekly} />
        <Card currentWeatherData={currentWeatherData} isDaily={isDaily} />

        {/*  */}
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
