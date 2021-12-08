const mongoose = require("mongoose");
const config = require("../config/seat");

const ShowtimeSchema = new mongoose.Schema({
  movies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
  cinemas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cinemas",
  },
  rooms: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
  seats: { type: Array, required: true, default: config.seat_room },
  price: { type: Number, required: true },
});

const Showtime = mongoose.model("showtimes", ShowtimeSchema, "showtimes");

module.exports = { ShowtimeSchema, Showtime };
