// middlewares/auth.js
const {
  WrongLoginPassw, //401
} = require("../errors/errors");

const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
    console.log("here1");
  } catch (err) {
    console.log("we auth");
    //return res.status(401).send({ message: "Необходима авторизация" });
    next(new WrongLoginPassw("Необходима авторизация"));
  }
  //console.log("here auth 2");
  req.user = payload; // записываем пейлоуд в объект запроса
  console.log(payload);

  next(); // пропускаем запрос дальше
};
