import React, { useCallback } from "react";
import { validate } from "react-email-validator";
import validator from "validator";
//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  /****          общие             ****/

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };
  /****           email              ****/

  //const [email, setEmail] = React.useState("");

  function handleEmail(event) {
    const target = event.target;
    let inputValue = event.target.value;
    //setEmail(inputValue);
    setValues({ ...values, ["email"]: inputValue });
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
  }
  /****           reset              ****/
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    handleChange,
    errors,
    isValid,
    handleEmail,
    resetForm,
  };
}
/******************     с параметрами           *************************/



/******************     пробуем перекрутить          *************************/
export function useFormWithValidationParams(Name, Email) {
  const [values, setValues] = React.useState({ name: Name, email: Email });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  console.log(values.email);
  console.log(values.name);
  console.log("VALIDATE AFTER");
  /****          общие             ****/

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };
  /****           email              ****/

  //const [email, setEmail] = React.useState(Email);

  function handleEmail(event) {
    const target = event.target;
    let inputValue = event.target.value;
    //setEmail(inputValue);
    setValues({ ...values, ["email"]: inputValue });
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
  }
  /****           reset              ****/
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    handleChange,
    errors,
    isValid,
    handleEmail,
    resetForm,
  };
}
/******************     с параметрами без email для фильмов        *************************/

export function useFormWithValidationFilms(search) {
  const [values, setValues] = React.useState({ film: search });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(!!search);
  /****          общие             ****/

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  /****           reset              ****/
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
