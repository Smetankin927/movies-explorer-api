import React from "react";
import Card from "./Card";
import SearchFilm from "./SearchFilm";
import Preloader from "./Preloader";

function MoviesCardList(props) {
  const handleMorecklick = () => {
    let tmp = Math.ceil(props.numberCards) + Math.ceil(props.numberMoreCards);
    console.log(tmp);
    props.setNumberCards(tmp);
    localStorage.setItem("numRender", tmp);
  };
  console.log("props.cards");
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
        ) : !!props.cards && props.cards.length > 0 && props.loggedIn ? (
          //при получении loggedIn мы точно получаем наш список лайкнутых карточек

          <>
            <ul className="cards-grid__container">
              {props.cards
                .slice(-props.numberCards)
                .reverse()
                .map((item) => (
                  <Card
                    trailer={item.trailerLink}
                    handleCardDelete={props.handleCardDelete}
                    saved={props.saved}
                    card={item}
                    onLikeCard={props.onLikeCard}
                    buttonName={"like"}
                    key={item.id}
                    Name={item.nameRU}
                    filmImg={`https://api.nomoreparties.co/${item.image.url}`}
                    altImg={item.image.name}
                    duration={item.duration}
                  />
                ))}
            </ul>
            <button
              className={
                props.cards.length > props.numberCards
                  ? "cards-grid__button-more"
                  : "cards-grid__button-more_hidden"
              }
              type="button"
              onClick={handleMorecklick}
            >
              Ещё
            </button>
          </>
        ) : props.cards.length > 0 ? (
          <h2 className="cards-grid__nothing-message">Ничего не найдено</h2>
        ) : (
          <h2 className="cards-grid__nothing-message">Введите слово</h2>
        )}
      </section>
    </main>
  );
}

export default MoviesCardList;
