import React from "react";
import Card from "./Card";
import SearchFilm from "./SearchFilm";
import testLinkImg from "../images/pic__COLOR_film.png";
function MoviesCardList() {
  return (
    <main className="content">
      <SearchFilm />
      <section className="cards-grid">
        <ul className="cards-grid__container">
          <Card
            buttonName={"like"}
            filmImg={testLinkImg}
            altImg={"кадр из фильма"}
          />
        </ul>
        <button className="cards-grid__button-more" type="button">
          Ещё
        </button>
      </section>
    </main>
  );
}

export default MoviesCardList;
