import "./App.css";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
import Notepad from "./components/Notepad/Notepad";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("Delhi");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <WeatherDashboard city={city} setCity={setCity} apiKey={apiKey} />
          }
        />

        <Route path="/notepad" element={<Notepad />} />
      </Routes>
    </Router>
  );
}

export default App;
