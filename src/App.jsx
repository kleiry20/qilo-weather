import "./App.css";
import { useState } from "react";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("Delhi");
  return (
    <>
      <WeatherDashboard city={city} setCity={setCity} apiKey={apiKey} />
    </>
  );
}

export default App;
