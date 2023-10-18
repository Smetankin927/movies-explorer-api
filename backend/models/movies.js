// models/card.js

const mongoose = require("mongoose");
// Опишем схему:
const moveSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  thumbnail: {
    // мелкий постер
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  trailer: {
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  owner: {
    //надо _id пользователя
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("movie", moveSchema);
