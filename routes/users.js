// routes/users.js
// это файл маршрутов
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
const {
  getUsers,
  getUserByID,
  getUserMe,
  updateUser,
  //login,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getUserMe); //FIXME
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object({
      userId: Joi.objectId(),
    }).unknown(true),
  }),
  getUserByID
);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email(),
      })
      .unknown(true),
  }),
  updateUser
);

module.exports = router; // экспортировали роутер
