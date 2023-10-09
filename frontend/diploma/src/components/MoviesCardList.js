import React from "react";
import Card from "./Card";
import testLinkImg from "../images/pic__COLOR_film.png";
function MoviesCardList() {
  return (
    <section className="cards-grid">
      <div className="cards-grid__container">
        <Card buttonName={"like"} filmImg={testLinkImg} />
      </div>
      <button className="cards-grid__button-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
