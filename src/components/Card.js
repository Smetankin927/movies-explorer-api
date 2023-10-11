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
    <li className="cards-grid__item">
      <img className="cards-grid__img" src={props.filmImg} alt={props.altImg} />
      <div className="cards-grid__overline">
        <h2 className="cards-grid__name">33 слова о дизайне</h2>
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
    </li>
  );
}

export default Card;
