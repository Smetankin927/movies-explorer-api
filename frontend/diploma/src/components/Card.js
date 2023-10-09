import React from "react";

function Card(props) {
  const isButtonLike = props.buttonName === "like" ? true : false;
  const isButtonRemove = props.buttonName === "remove" ? true : false;
  let isLiked = true;
  const handleLikeClick = () => {
    /*заглушка */
  };

  const handleDeleteClick = () => {
    /*заглушка */
  };

  /* /// */
  return (
    <div className="cards-grid__item">
      <img
        className="cards-grid__img"
        src={props.filmImg}
        alt="кадр из фильма"
      />
      <div className="cards-grid__overline">
        <p className="cards-grid__name">33 слова о дизайне</p>
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
      <p className="cards-grid__chrono">1ч42м</p>
    </div>
  );
}

export default Card;
