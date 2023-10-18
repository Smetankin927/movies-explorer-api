import React from "react";
import Card from "./Card";
import SearchFilm from "./SearchFilm";
import Preloader from "./Preloader";

function SavedMovieCardList(props) {
  console.log(props.cards);
  return (
    <main className="content">
      <SearchFilm
        isPreloaderActive={props.isPreloaderActive}
        setPreloaderActive={props.setPreloaderActive}
        hadleSearchFilms={props.hadleSearchFilms}
        isOn={props.isOn}
        setValue={props.setValue}
      />

      <section className="cards-grid">
        {props.isPreloaderActive ? (
          <Preloader />
        ) : (
          <ul className="cards-grid__container">
            {props.cards
              .slice(-props.numberCards)
              .reverse()
              .map((item) => (
                <Card
                  handleCardDelete={props.handleCardDelete}
                  saved={props.saved}
                  card={item}
                  onLikeCard={props.onLikeCard}
                  buttonName={"remove"}
                  key={item.movieId}
                  Name={item.nameRU}
                  filmImg={item.image}
                  altImg={item.nameEN}
                  duration={item.duration}
                />
              ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default SavedMovieCardList;
