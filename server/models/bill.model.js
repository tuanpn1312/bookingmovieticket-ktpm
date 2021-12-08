const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  movieTitle: { type: String, required: true },
  seat: { type: Array, required: true },
  room: { type: String, required: true },
  showTimeId: { type: mongoose.Schema.Types.ObjectId, ref: "showtimes" },
  price: { type: Number, required: true },
  showTime: { type: Date, required: true },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  checkoutDate: { type: Date, required: true },
  qrCode: { type: String, required: false },
  status: { type: Boolean, required: true },
});

const Bill = mongoose.model("bills", BillSchema, "bills");

module.exports = { BillSchema, Bill };
