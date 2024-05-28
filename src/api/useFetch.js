import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`;
const avg_url = `https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m&daily=precipitation_sum,rain_sum&timezone=auto`;


export async function getCurrentWeather() {
  try {
    const response = await axios.get(url);
    const currentWeather = await response.data;
    console.log("currentWeather", currentWeather);
    return currentWeather;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error if you want it to be handled by the caller
  }
}

// export async function getAverage() {
//   const [averageWeatherdata, setAverageWeatherData] = useState();

//   try {
//     const response = await axios.get(avg_url);
//     setAverageWeatherData(await response.data);
//     return averageWeatherdata;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

function useFetch(url, options) {
  const [averageWeatherdata, setAverageWeatherData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAverageData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(avg_url, options);
      const result = await response.json();
      setAverageWeatherData(result);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAverageData();
  }, [avg_url, options]);
  
  return { averageWeatherdata, error, isLoading };
}

export default useFetch;
