import React from "react";
import Card from "./Card";
import testLinkImg from "../images/pic__COLOR_film.png";
import SearchFilm from "./SearchFilm";

function SavedMovieCardList() {
  return (
    <main className="content">
      <SearchFilm />
      <section className="cards-grid">
        <ul className="cards-grid__container">
          <Card buttonName={"remove"} filmImg={testLinkImg} altImg={"кадр из фильма"} />
        </ul>
        <button className="cards-grid__button-more" type="button">
          Ещё
        </button>
      </section>
    </main>
  );
}

export default SavedMovieCardList;
