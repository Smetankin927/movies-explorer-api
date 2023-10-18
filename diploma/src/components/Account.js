import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormWithValidationParams } from "../utils/FormValidate";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Account(props) {
  /*****       подписка на контекст                *****/

  const currentUser = React.useContext(CurrentUserContext);
  /*****        работа с формой                *****/

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  /****          общие             ****/

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    console.log("value");
    console.log(value);

    props.setValues({ ...props.values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    let tmp = target.closest("form").checkValidity();
    console.log("tmp");
    console.log(tmp);

    setIsValid(tmp);
  };
  /****           email              ****/

  //const [email, setEmail] = React.useState(Email);

  const handleEmail = (event) => {
    const target = event.target;
    let inputValue = event.target.value;
    //setEmail(inputValue);
    props.setValues({ ...props.values, ["email"]: inputValue });
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(inputValue)) {
      setErrors({ ...errors, ["email"]: "please enter valid email" });
      var A = false && target.closest("form").checkValidity();
      setIsValid(A);
    } else {
      setErrors({ ...errors, ["email"]: "" });
      var B = true && target.closest("form").checkValidity();

      setIsValid(B);
    }
  };

  // /*****        обновляем данные (FIXME)              *****/
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.setTooltipMessages({
      succesMessage: "Данные успешно обновлены",
      failMessage: "Что-то пошло не так",
    });
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: props.values.name,
      email: props.values.email,
    });
  };

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
              value={props.values.name}
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
              value={props.values.email}
              required
            />
          </div>
          <span className="account__input-error"> {errors.name}</span>
          <span className="account__input-error">{errors.email}</span>
          <button
            className={
              !(
                isValid &&
                !(
                  props.values.name === currentUser.name &&
                  props.values.email === currentUser.email
                )
              )
                ? "account__edit-button account__edit-button_disable"
                : "account__edit-button"
            }
            type="submit"
            disabled={
              !(
                isValid &&
                !(
                  props.values.name === currentUser.name &&
                  props.values.email === currentUser.email
                )
              )
            }
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
