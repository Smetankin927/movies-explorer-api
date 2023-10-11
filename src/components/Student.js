import React from "react";
import studentImgPath from "../images/pic__COLOR_pic.png";
import arrowImgPath from "../images/text__COLOR_font-main.svg";
function Student() {
  return (
    <section className="description student">
      <h2 className="description__title">Студент</h2>
      <div className="student__about">
        <div className="student__about-text">
          <h3 className="student__name">Виталий</h3>
          <p className="student__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="student__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="student__git-link" href="/">
            Github
          </a>
        </div>
        <img
          className="student__photo"
          src={studentImgPath}
          alt="изображение студента"
        />
      </div>
      <p className="student__portfolio-label">Портфолио</p>
      <nav className="student__links-container">
        <ul className="student__links-list">
          <li className="student__links-list-item">
            <a className="student__link" href="/">
              <p className="student__link-text">Статичный сайт</p>
              <img
                className="student__link-img"
                src={arrowImgPath}
                alt="стрелка"
              />
            </a>
          </li>
          <li className="student__links-list-item">
            <a className="student__link" href="/">
              <p className="student__link-text">Адаптивный сайт</p>
              <img
                className="student__link-img"
                src={arrowImgPath}
                alt="стрелка"
              />
            </a>
          </li>
          <li className="student__links-list-item">
            <a className="student__link" href="/">
              <p className="student__link-text">Одностраничное приложение</p>
              <img
                className="student__link-img"
                src={arrowImgPath}
                alt="стрелка"
              />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
export default Student;
