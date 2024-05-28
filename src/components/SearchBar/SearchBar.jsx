import "./SearchBar.css";
import { useState } from "react";

const SearchBar = (props) => {
  const { city, setCity } = props;

  const [timerId, setTimerId] = useState(null);

  const search = async (value) => {
    if (value === "") {
      return 0;
    } else setCity(value);
  };

  const handleSearch = (value) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      search(value);
    }, 1000);

    setTimerId(newTimerId);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for cities"
        className="searchBar"
        id="searchText"
        name={city}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
