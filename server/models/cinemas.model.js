const mongoose = require("mongoose");

const cinemasSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  cinemaAddress: { type: String, required: true },
  cinemaType: { type: String, required: true },
  showtimes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "showtimes",
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
  ],
  imgUrl: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const Cinema = mongoose.model("cinemas", cinemasSchema, "cinemas");

module.exports = { cinemasSchema, Cinema };
