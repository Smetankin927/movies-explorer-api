import React from "react";
import * as Auth from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../utils/FormValidate";
function Registration(props) {
  /***   кнопка войти      ****/
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signin");
  };

  /*****     работа с формой             *****/

  const { values, handleChange, errors, isValid, handleEmail, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setTooltipMessages({
      succesMessage: " Вы успешно Зарегистрировались",
      failMessage: "Что-то пошло не так",
    });
    Auth.register(values.password, values.email, values.name)
      .then((data) => {
        //console.log("DATE")
        console.log(data.error);
        props.setIsSuccessInfoTooltipStatus(true);
        props.setIsInfoTooltipOpen(true);
        //OPEN MODAL WINDOW
      })
      .then(() => {
        Auth.authorize(values.password, values.email)
          .then((data) => {
            console.log("register");
            props.handleLogin(); //set isLogedIn = true
            localStorage.setItem("jwt", data.token);
            props.setUserEmail(values.email); //FIXME

            navigate("/movies");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("ПРОБЛЕМА РЕГИСТРАЦИИ");
        props.setIsSuccessInfoTooltipStatus(false);
        props.setIsInfoTooltipOpen(true);
      }); //OPEN MODAL WINDOW
  };

  /*****     return            *****/
  return (
    <main className="content">
      <div className="register">
        <form
          className="register__form"
          name="form_registration"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="register__input-section">
            <span className="register__input-name">Имя</span>
            <input
              className="register__input"
              type="text"
              name="name"
              value={values.name}
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              required
            />
            <span className="register__input-error"> {errors.name}</span>
          </div>

          <div className="register__input-section">
            <span className="register__input-name">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              value={values.email}
              placeholder="Email"
              minLength="2"
              maxLength="30"
              onChange={handleEmail}
              required
            />
            <span className="register__input-error">{errors.email}</span>
          </div>

          <div className="register__input-section">
            <span className="register__input-name">Пароль</span>
            <input
              className="register__input"
              type="password"
              minLength="4"
              maxLength="30"
              name="password"
              value={values.password}
              placeholder="Пароль"
              onChange={handleChange}
              required
            />
            <span className="register__input-error">{errors.password} </span>
          </div>
          <button
            className={
              isValid
                ? "register__submit-button"
                : "register__submit-button register__submit-button_disabled"
            }
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__underform">
          <p className="register__underform-text">Уже зарегистрированы?</p>
          <button
            className="register__underform-link"
            type="button"
            onClick={handleLoginClick}
          >
            Войти
          </button>
        </div>
      </div>
    </main>
  );
}

export default Registration;
