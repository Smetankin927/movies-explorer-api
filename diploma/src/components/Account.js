import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormWithValidationParams } from "../utils/FormValidate";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Account(props) {
  /*****       подписка на контекст                *****/

  const currentUser = React.useContext(CurrentUserContext);
  /*****        работа с формой                *****/

  const { values, handleChange, errors, isValid, handleEmail, resetForm } =
    useFormWithValidationParams(currentUser.name, currentUser.email);

  /*****        обновляем данные (FIXME)              *****/
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.setTooltipMessages({
      succesMessage: "Данные успешно обновлены",
      failMessage: "Что-то пошло не так",
    });
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  /*****         return             ******/

  return (
    <main className="content">
      <section className="account">
        <h1 className="account__greeting">{`Привет, ${currentUser.name}!`}</h1>
        <form
          className="account__info"
          name="form_account"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="account__info-text">
            <span className="account__info-text-key">Имя</span>
            <input
              className="account__info-text-value"
              type="text"
              name="name"
              minLength="2"
              maxLength="30"
              placeholder="Виталий"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account__info-text">
            <span className="account__info-text-key">E-mail</span>
            <input
              className="account__info-text-value"
              type="email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              onChange={handleEmail}
              value={values.email}
              required
            />
          </div>
          <span className="account__input-error"> {errors.name}</span>
          <span className="account__input-error">{errors.email}</span>
          <button
            className={
              isValid
                ? "account__edit-button"
                : "account__edit-button account__edit-button_disable"
            }
            type="submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
        </form>
        <button
          className="account__logout-button"
          type="button"
          onClick={props.handleSignOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Account;
