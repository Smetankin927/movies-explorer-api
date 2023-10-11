import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleRegistrationClick = () => {
    navigate("/signup");
  };
  return (
    <main className="content">
      <div className="register">
        <form className="register__form">
          <div className="register__input-section">
            <span className="register__input-name">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="register__input-error"> </span>
          </div>
          <div className="register__input-section">
            <span className="register__input-name">Пароль</span>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              required
            />
            <span className="register__input-error"> </span>
          </div>
          <button
            className="register__submit-button register__submit-button_login"
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
