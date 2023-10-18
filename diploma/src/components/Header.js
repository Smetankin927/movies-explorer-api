import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderWithForm from "./HeaderWithForm";
import Navigate from "./Navigate";

import logoPath from "../images/logo.svg";
function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };
  const handleRegistrationClick = () => {
    navigate("/signup");
  };
  if (props.isHeaderVisible) {
    if (location.pathname === "/signin") {
      return (
        <HeaderWithForm
          Greeting={"Рады видеть!"}
          handleLogoClick={handleLogoClick}
        />
      );
    } else if (location.pathname === "") {
      return <header className="header header_invisible"></header>;
    } else if (location.pathname === "/signup") {
      return (
        <HeaderWithForm
          Greeting={"Добро пожаловать!"}
          handleLogoClick={handleLogoClick}
        />
      );
    } else if (
      location.pathname === "/" ||
      location.pathname === "/movies" ||
      location.pathname === "/movies-saved" ||
      location.pathname === "/profile"
    ) {
      return props.loggedIn ? (
        <header
          className={`${
            location.pathname === "/" ? "header" : "header header_white"
          }`}
        >
          <img
            className="header__logo"
            src={logoPath}
            alt="логотип"
            onClick={handleLogoClick}
          />
          <Navigate onMenuClick={props.onMenuClick} />
        </header>
      ) : (
        <header className="header">
          <img
            className="header__logo"
            src={logoPath}
            alt="логотип"
            onClick={handleLogoClick}
          />
          <nav className="header__buttons-container">
            <button
              className="header__button-registration"
              type="button"
              onClick={handleRegistrationClick}
            >
              Регистрация
            </button>
            <button
              className="header__button-login"
              type="button"
              onClick={handleLoginClick}
            >
              Войти
            </button>
          </nav>
        </header>
      );
    }
  } else {
    return <header className="header header_invisible"></header>;
  }
}
export default Header;
