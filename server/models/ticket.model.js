const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  movieTitle: { type: String, required: true },
  seat: { type: Number, required: true },
  room: { type: String, required: true },
  showTimeId: { type: mongoose.Schema.Types.ObjectId, ref: "showtimes" },
  price: { type: Number, required: true },
  showTime: { type: Date, required: true },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  checkoutDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
});

const Ticket = mongoose.model("tickets", TicketSchema, "tickets");

module.exports = { TicketSchema, Ticket };
