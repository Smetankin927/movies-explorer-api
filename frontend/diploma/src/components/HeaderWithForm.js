import React from "react";
import accIconPath from "../images/logo__COLOR_main-1.png";
function HeaderWithForm(props) {
  return (
    <header className="header__with-form ">
      <img
        className="header__logo header__logo_with-form"
        src={accIconPath}
        alt="логотип"
        onClick={props.handleLogoClick}
      />
      <hi className="header__greeting">{props.Greeting}</hi>
    </header>
  );
}

export default HeaderWithForm;
