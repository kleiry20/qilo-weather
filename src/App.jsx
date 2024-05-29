import "./App.css";
import { useState, useNavigate } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
import Notepad from "./components/Notepad/Notepad";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const navigate = useNavigate;
  const [city, setCity] = useState("Delhi");

  return (
    <Router>
      {/* <WeatherDashboard city={city} setCity={setCity} apiKey={apiKey} /> */}
     

      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/notepad" element={<Notepad />} />
      </Routes>
    </Router>
  );
}

export default App;
