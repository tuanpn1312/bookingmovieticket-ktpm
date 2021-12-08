const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  description: { type: String, required: true },
  star: { type: Number, required: true },
  rateDate: { type: Date, required: true },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  movieFilm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
});

const Rating = mongoose.model("ratings", ratingSchema, "ratings");

module.exports = { ratingSchema, Rating };
