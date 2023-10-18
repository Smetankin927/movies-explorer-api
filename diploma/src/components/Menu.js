import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import accIconImg from "../images/icon__COLOR_icon-main.svg";
function Menu(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/profile");
  };

  return (
    <div className={props.isOpen ? "menu menu_active" : "menu"}>
      <button
        className="menu__overlay"
        type="button"
        onClick={props.onClose}
      ></button>
      <div className="menu__bar">
        <button
          className="menu__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <nav className="menu__links-container">
          <ul className="menu__links">
            <li className="menu__links-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "menu__link menu__link_current" : "menu__link"}`
                }
              >
                Главная
              </NavLink>
            </li>
            <li className="menu__links-item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `${isActive ? "menu__link menu__link_current" : "menu__link"}`
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li className="menu__links-item">
              <NavLink
                to="/movies-saved"
                className={({ isActive }) =>
                  `${isActive ? "menu__link menu__link_current" : "menu__link"}`
                }
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          className="menu__account"
          type="button"
          onClick={handleAccountClick}
        >
          Аккаунт
          <span className="menu__account-iconplace">
            <img className="menu__account-icon" src={accIconImg} alt="иконка" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
