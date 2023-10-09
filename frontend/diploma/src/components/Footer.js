import React from "react";
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__central-text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__underline">
        <p className="footer__year">&copy;2023</p>
        <div className="footer__links">
          <a className="footer__link" href="/">
            Яндекс Практикум
          </a>
          <a className="footer__link" href="/">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
