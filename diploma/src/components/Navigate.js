import React from "react";
import accIconPath from "../images/icon__COLOR_icon-main.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Navigate(props) {
  const location = useLocation();
  const navigate = useNavigate();

  /*check color */
  let linkClassName = `${
    location.pathname === "/"
      ? "header__film-link"
      : "header__film-link header__film-link_black"
  }`;
  let loginButtoClassName = `${
    location.pathname === "/"
      ? "header__button-account"
      : "header__button-account header__button-account_white"
  }`;

  const handleAccountClick = () => {
    navigate("/profile");
  };
  return (
    <>
      <nav className="header__linksbox">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `${
              isActive
                ? `${linkClassName} header__film-link_chosen`
                : linkClassName
            }`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/movies-saved"
          className={({ isActive }) =>
            `${
              isActive
                ? `${linkClassName} header__film-link_chosen`
                : linkClassName
            }`
          }
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
      <button
        className={loginButtoClassName}
        type="button"
        onClick={handleAccountClick}
      >
        Аккаунт
        <span className="header__account-iconplace">
          <img
            className="header__account-icon"
            src={accIconPath}
            alt="иконка аккаунта"
          />
        </span>
      </button>
      <button
        className="header__menu-button"
        type="button"
        onClick={props.onMenuClick}
      ></button>
    </>
  );
}

export default Navigate;
