import React, { useState } from "react";
import Switch from "./Switch";
function SearchFilm() {
  const [value, setValue] = useState(false);
  return (
    <div className="search-film">
      <form className="search-film__form">
        <div className="search-film__input-container">
          <input
            className="search-film__input"
            type="text"
            name="filmSearchForm"
            placeholder="Фильм"
            required
          />
          <button className="search-film__submit" type="submit">
            Найти
          </button>
        </div>
        <div className="search-film__options">
          <Switch isOn={value} handleToggle={() => setValue(!value)} />
        </div>
      </form>
    </div>
  );
}

export default SearchFilm;
