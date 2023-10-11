import React from "react";
import planetImgPath from "../images/text__COLOR_landing-logo.svg";

function Lead() {
  const handleLearnMoreClick = () => {
    document.getElementById("description").scrollIntoView();
  };
  return (
    <section className="lead">
      <div className="lead__text-container">
        <h1 className="lead__title">
          Учебный проект студента факультета{" "}
          <span className="lead__no-space">Веб-разработки.</span>
        </h1>
        <p className="lead__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button
          className="lead__button"
          type="button"
          onClick={handleLearnMoreClick}
        >
          Узнать больше
        </button>
      </div>
      <img
        className="lead__image"
        src={planetImgPath}
        alt="изображение планеты"
      />
    </section>
  );
}

export default Lead;
