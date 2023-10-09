import React from "react";

function Account() {
  return (
    <section className="account">
      <h1 className="account__greeting">Привет, Виталий!</h1>
      <div className="account__info">
        <p className="account__info-text">
          <span className="account__info-text-key">Имя</span>
          <span className="account__info-text-value">Виталий</span>
        </p>
        <p className="account__info-text">
          <span className="account__info-text-key">E-mail</span>
          <span className="account__info-text-value">pochta@yandex.ru</span>
        </p>
      </div>
      <button className="account__edit-button">Редактировать</button>
      <button className="account__logout-button">Выйти из аккаунта</button>
    </section>
  );
}

export default Account;
