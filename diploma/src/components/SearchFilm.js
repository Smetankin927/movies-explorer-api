import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "./Switch";
import { useFormWithValidationFilms } from "../utils/FormValidate";
function SearchFilm(props) {
  const location = useLocation();
  /********         достаем запрос из   localStorage           ******* */

  localStorage.removeItem("filmSearchSaved");
  const filmSearch =
    location.pathname === "/movies" &&
    localStorage.getItem("filmSearch") !== null
      ? localStorage.getItem("filmSearch")
      : "";
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidationFilms(filmSearch);
  /****************           ищем фильмы, записываем поиск в localStorage              *************** */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setPreloaderActive(true);
    checkWhoIs();
    props.hadleSearchFilms(values.film, props.isOn);
  };

  const checkWhoIs = () => {
    if (location.pathname === "/movies") {
      localStorage.setItem("filmSearch", values.film);
    } else if (location.pathname === "/movies-saved") {
      localStorage.setItem("filmSearchSaved", values.film);
    }
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
              onChange={handleChange}
              value={values.film}
              required
            />
          ) : (
            <input
              className="search-film__input"
              type="text"
              name="film"
              placeholder="Фильм"
              onChange={handleChange}
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
            handleToggle={() => {
              if (location.pathname === "/movies") {
                //отключил запись тугл в сохраненных фильмах
                localStorage.setItem("toogle", !props.isOn);
                localStorage.setItem("filmSearch", values.film);
              } else if (location.pathname === "/movies-saved") {
                localStorage.setItem("filmSearchSaved", values.film);
              }
              props.setValue(!props.isOn);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchFilm;
