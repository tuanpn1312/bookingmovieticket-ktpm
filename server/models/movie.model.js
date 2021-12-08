const mongoose = require("mongoose");

const enumStatus = {
  ACTIVE: "active",
  NOW_SHOWING: "now showing",
  COMING_SOON: "coming soon",
};

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  description: { type: String, required: false },
  movieDuration: { type: Number, required: true },
  movieFormat: { type: String, required: true },
  trailerUrl: { type: String, required: false },
  national: { type: String, required: true },
  movieImg: { type: String, required: true },
  bannerImg: { type: String, required: true },
  direction: { type: String, required: true },
  cast: { type: String, required: true },
  status: { type: String, enum: Object.values(enumStatus) },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
  ],
});

const Movie = mongoose.model("movies", MovieSchema, "movies");

module.exports = { MovieSchema, Movie };
