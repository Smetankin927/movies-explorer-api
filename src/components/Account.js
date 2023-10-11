import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };
  return (
    <main className="content">
      <section className="account">
        <h1 className="account__greeting">Привет, Виталий!</h1>
        <form className="account__info">
          <div className="account__info-text">
            <span className="account__info-text-key">Имя</span>
            <input
              className="account__info-text-value"
              type="text"
              value={`Виталий`}
            />
          </div>
          <div className="account__info-text">
            <span className="account__info-text-key">E-mail</span>
            <input
              className="account__info-text-value"
              type="email"
              value={`pochta@yandex.ru`}
            />
          </div>
        </form>
        <button className="account__edit-button" type="submit">
          Редактировать
        </button>
        <button
          className="account__logout-button"
          type="button"
          onClick={handleLogOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Account;
