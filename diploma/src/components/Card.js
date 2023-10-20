import React from "react";

function Card(props) {
  const isButtonLike = props.buttonName === "like" ? true : false;
  const isButtonRemove = props.buttonName === "remove" ? true : false;
  const flag = props.saved.some((it) => it.nameRU === props.card.nameRU);
  const [isLiked, setIsLiked] = React.useState(flag);
  React.useEffect(
    () => {
      const flag1 = props.saved.some((it) => it.nameRU === props.card.nameRU);
      setIsLiked(flag1);
    },
    props.saved,
    props.cards
  );

  const handleLikeClick = () => {
    props.onLikeCard(props.card, isLiked, setIsLiked);
  };

  const handleDeleteClick = () => {
    /*заглушка */
    props.handleCardDelete(props.card.movieId);
    /*выставить лайк*/
  };
  const handleTrailerClick = () => {
    window.open(props.trailer, "_blank");
  };

  /* /// */
  return (
    <li className="cards-grid__item">
      <img
        className="cards-grid__img"
        src={props.filmImg}
        alt={props.altImg}
        onClick={handleTrailerClick}
      />
      <div className="cards-grid__overline">
        <h2 className="cards-grid__name">{props.Name}</h2>
        {isButtonLike && (
          <button
            className={`cards-grid__like-button ${
              isLiked && "cards-grid__like-button_active"
            }`}
            onClick={handleLikeClick}
            type="button"
          ></button>
        )}
        {isButtonRemove && (
          <button
            className="cards-grid__remove-button"
            onClick={handleDeleteClick}
            type="button"
          ></button>
        )}
      </div>
      <p className="cards-grid__chrono">{`${Math.trunc(props.duration / 60)}ч ${
        props.duration % 60
      }м`}</p>
    </li>
  );
}

export default Card;
