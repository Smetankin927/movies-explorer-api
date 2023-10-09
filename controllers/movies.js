// это файл контроллеров
const Movie = require("../models/movies");

const {
  NotFoundError, //404
  ServerError, //500
  ValidationError, //400
  WrongLoginPassw, //401
  AccessError, //403
  RegistrationError, // 409
} = require("../errors/errors");

function createMovie(req, res, next) {
  // country, director, duration, year, description,
  // image, trailer, nameRU, nameEN и thumbnail, movieId
  // owner from UserId
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country: country,
    director: director,
    duration: duration,
    year: year,
    description: description,
    image: image,
    trailer: trailer,
    thumbnail: thumbnail,
    nameRU: nameRU,
    nameEN: nameEN,
    movieId: movieId,
    owner: req.user._id, //keep in mind
  })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        console.log("err createMovie");
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
}

function getMovies(req, res) {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
}

function deleteMovieByID(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найден");
      }
      if (req.user._id == card.owner) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((card) => {
            res.status(200).send({ data: card });
          })
          .catch((err) => {
            if (err.name === "CastError") {
              next(new ValidationError("Переданы некорректные данные"));
              return;
            }
            next(err);
          });
      } else {
        throw new AccessError("нет Доступа");
      }
    })
    .catch((err) => next(err));
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovieByID,
};
