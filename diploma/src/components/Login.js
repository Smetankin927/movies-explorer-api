import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";
import { useFormWithValidation } from "../utils/FormValidate";

function Login(props) {
  const navigate = useNavigate();

  /*****        перенаправляемся на регистрацию                *****/

  const handleRegistrationClick = () => {
    navigate("/signup");
  };

  /*****        работа с формой                *****/

  const { values, handleChange, errors, isValid, handleEmail, resetForm } =
    useFormWithValidation();

  /*****           логиниимся, записываем токен                *****/

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitForm");
    props.setTooltipMessages({
      succesMessage: " Вы успешно Вошли в систему",
      failMessage: "Что-то пошло не так",
    });
    Auth.authorize(values.password, values.email)
      .then((data) => {
        props.handleLogin(); //set isLogedIn = true
        localStorage.setItem("jwt", data.token);
        props.setUserEmail(values.email); //FIXME
        // props.setIsSuccessInfoTooltipStatus(true);
        // props.setIsInfoTooltipOpen(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        // props.setIsSuccessInfoTooltipStatus(false);
        // props.setIsInfoTooltipOpen(true);
      });
  };

  /*****       return             *****/

  return (
    <main className="content">
      <div className="register">
        <form
          className="register__form"
          name="form_login"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="register__input-section">
            <span className="register__input-name">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              onChange={handleEmail}
              value={values.email}
              required
            />
            <span className="register__input-error">{errors.email}</span>
          </div>
          <div className="register__input-section">
            <span className="register__input-name">Пароль</span>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
              value={values.password}
              required
            />
            <span className="register__input-error">{errors.password} </span>
          </div>
          <button
            className={
              isValid
                ? "register__submit-button register__submit-button_login"
                : "register__submit-button register__submit-button_login register__submit-button_disabled"
            }
            disabled={!isValid}
            type="submit"
          >
            Войти
          </button>
        </form>
        <div className="register__underform">
          <p className="register__underform-text">Ещё не зарегистрированы?</p>
          <button
            className="register__underform-link"
            type="button"
            onClick={handleRegistrationClick}
          >
            Регистрация
          </button>
        </div>
      </div>
    </main>
  );
}

export default Login;
