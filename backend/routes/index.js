const router = require("express").Router();

const {
  NotFoundError, //404
} = require("../errors/errors");

const usersRoute = require("./users");
const cardsRoute = require("./movies");

router.use("/", usersRoute);
router.use("/", cardsRoute);

router.use("/*", (req, res, next) => {
  //res.status(404).send({ message: "Страница такой нету." });
  next(new NotFoundError("Страница такой нету."));
  return;
});

module.exports = router;
