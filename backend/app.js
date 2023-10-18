// app.js — входной файл

require("dotenv").config(); // теперь всё в process.env.*NAME*
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");

const indexRoute = require("./routes/index"); // импортируем роутер

const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const { createUser, login, signOut } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const { DB_ADDRESS } = process.env;
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://api.bubble.nomoredomainsicu.ru",
      "https://api.nomoreparties.co/beatfilm-movies",
    ],
    credentials: true,
  })
);
//app.use(
//  cors({
//    origin: ["https://api.nomoreparties.co/beatfilm-movies"],
//    credentials: false,
//  })
//);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookies());
app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
// подключаем мидлвары, роуты и всё остальное...
app.use(requestLogger); // подключаем логгер запросов
//краш-тест
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
// роуты, не требующие авторизации,
// например, регистрация и логин
app.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  login
);
// авторизация
app.use(auth);
//все остальные
app.post("/signout", signOut);

app.use("/", indexRoute); // запускаем

app.use(errorLogger); // подключаем логгер ошибок
//обработка ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); //централизованный обработчик ошибок

app.listen(3000, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
