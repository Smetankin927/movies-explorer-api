import React from "react";

function Description() {
  return (
    <section className="description">
      <h2 className="description__title">О проекте</h2>
      <div className="description__columns">
        <div className="description__column">
          <h3 className="description__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="description__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="description__column">
          <h3 className="description__column-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="description__column-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="description__line">
        <div className="description__line-piece description__line-piece_green">
          <p className="description__line-text">1 неделя</p>
        </div>
        <div className="description__line-piece description__line-piece_gray">
          <p className="description__line-text">4 недели</p>
        </div>
      </div>
      <div className="description__underline">
        <p className="description__underline_back">Back-end</p>
        <p className="description__underline_front">Front-end</p>
      </div>
    </section>
  );
}

export default Description;
