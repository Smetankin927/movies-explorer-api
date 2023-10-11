import React from "react";
import accIconPath from "../images/logo.svg";
function HeaderWithForm(props) {
  return (
    <header className="header-with-form">
      <img
        className="header-with-form__logo"
        src={accIconPath}
        alt="логотип"
        onClick={props.handleLogoClick}
      />
      <h1 className="header-with-form__greeting">{props.Greeting}</h1>
    </header>
  );
}

export default HeaderWithForm;
