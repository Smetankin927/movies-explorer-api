import React from "react";
function SearchFilm() {
  return (
    <section className="search-film">
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
          <label className="search-film__toggle" for="shortFilms">
            <input
              className="search-film__toggle-checkbox"
              type="checkbox"
              id="shortFilms"
              checked
            />
            <div className="search-film__toggle-switch"></div>
            <span className="search-film__toggle-name">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchFilm;
