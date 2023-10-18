import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "./Switch";
import { useFormWithValidationFilms } from "../utils/FormValidate";
function SearchFilm(props) {
  const location = useLocation();
  // const [value, setValue] = useState(false); //for Toogre shortFilms

  /********         достаем запрос из   localStorage           ******* */
  const filmSearch =
    location.pathname === "/movies"
      ? localStorage.getItem("filmSearch")
      : localStorage.getItem("filmSearchSaved");
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidationFilms(filmSearch);
  /****************           ищем фильмы, записываем поиск в localStorage              *************** */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setPreloaderActive(true);
    if (location.pathname === "/movies") {
      localStorage.setItem("filmSearch", values.film);
    }
    if (location.pathname === "/movies-saved") {
      localStorage.setItem("filmSearchSaved", values.film);
    }
    props.hadleSearchFilms(values.film, props.isOn);
  };

  const realHandleChange = (event) => {
    handleChange(event);
    // if (
    //   location.pathname === "/movies-saved" &&
    //   (values.film == null || values.film === "" || values.film.length === 1)
    // ) {
    //props.hadleSearchFilms(values.film, props.isOn);
    // }
  };

  /***************             return                 ***************/
  return (
    <div className="search-film">
      <form
        className="search-film__form"
        name="form_films"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-film__input-container">
          {!!location.pathname === "/movies" ? (
            <input
              className="search-film__input"
              type="text"
              name="film"
              placeholder="Фильм"
              minLength={2}
              onChange={realHandleChange}
              value={values.film}
              required
            />
          ) : (
            <input
              className="search-film__input"
              type="text"
              name="film"
              placeholder="Фильм"
              minLength={2}
              onChange={realHandleChange}
              value={values.film}
            />
          )}
          <button
            className={
              isValid
                ? "search-film__submit"
                : "search-film__submit search-film__submit_disabled"
            }
            type="submit"
            disabled={!isValid}
          >
            Найти
          </button>
        </div>
        <div className="search-film__options">
          <Switch
            isOn={props.isOn}
            handleToggle={() => props.setValue(!props.isOn)}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchFilm;
