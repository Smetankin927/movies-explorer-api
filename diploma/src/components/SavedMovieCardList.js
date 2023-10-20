import React from "react";
import Card from "./Card";
import SearchFilm from "./SearchFilm";
import Preloader from "./Preloader";

function SavedMovieCardList(props) {
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
        ) : !!props.cards && props.cards.length > 0 && props.loggedIn ? (
          //при получении loggedIn мы точно получаем наш список лайкнутых карточек
          <ul className="cards-grid__container">
            {props.cards
              .slice(-props.numberCards)
              .reverse()
              .map((item) => (
                <Card
                  handleCardDelete={props.handleCardDelete}
                  saved={props.saved}
                  cards={props.cards}
                  card={item}
                  onLikeCard={props.onLikeCard}
                  buttonName={"remove"}
                  key={item.movieId}
                  trailer={item.trailer}
                  Name={item.nameRU}
                  filmImg={item.image}
                  altImg={item.nameEN}
                  duration={item.duration}
                  setCardSaved={props.setCardSaved}
                />
              ))}
          </ul>
        ) : props.cards.length > 0 ? (
          <h2 className="cards-grid__nothing-message">Ничего не найдено</h2>
        ) : (
          <h2 className="cards-grid__nothing-message">Нет сохраненных</h2>
        )}
      </section>
    </main>
  );
}

export default SavedMovieCardList;
