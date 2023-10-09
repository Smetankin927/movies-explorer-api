import React from "react";
function Technologies() {
  return (
    <section className="technologies">
      <h2 className="description__title">Технологии</h2>
      <h3 className="technologies__center-title">7 технологий</h3>
      <p className="technologies__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="technologies__card-container">
        <div className="technologies__card">
          <p className="technologies__card-text">HTML</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">CSS</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">JS</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">React</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">Git</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">Express.js</p>
        </div>

        <div className="technologies__card">
          <p className="technologies__card-text">MongoDB</p>
        </div>
      </div>
    </section>
  );
}
export default Technologies;
