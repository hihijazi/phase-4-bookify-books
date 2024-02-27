// SearchBox.js

import React, { useState } from "react";
import "../index.css";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container"> {/* Apply container class */}
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder=""
          value={query}
          onChange={handleInputChange}
        />
        <button className="search-button" type="submit">Search</button> {/* Apply button class */}
      </form>
    </div>
  );
};

export default SearchBox;
