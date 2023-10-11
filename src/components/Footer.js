import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Footer() {
  const location = useLocation();
  if (
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/movies-saved"
  ) {
    return (
      <footer className="footer">
        <p className="footer__central-text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__underline">
          <p className="footer__year">&copy;2023</p>
          <ul className="footer__links">
            <li className="footer__links-item">
              <a className="footer__link" href="/">
                Яндекс Практикум
              </a>
            </li>
            <li className="footer__links-item">
              <a className="footer__link" href="/">
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  } else {
    return <footer className="footer footer_invisible"></footer>;
  }
}

export default Footer;
