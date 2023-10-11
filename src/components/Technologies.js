import React from "react";
function Technologies() {
  return (
    <section className="description technologies">
      <h2 className="description__title">Технологии</h2>
      <h3 className="technologies__center-title">7 технологий</h3>
      <p className="technologies__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="technologies__card-container">
        <li className="technologies__card">
          <p className="technologies__card-text">HTML</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">CSS</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">JS</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">React</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">Git</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">Express.js</p>
        </li>

        <li className="technologies__card">
          <p className="technologies__card-text">MongoDB</p>
        </li>
      </ul>
    </section>
  );
}
export default Technologies;
