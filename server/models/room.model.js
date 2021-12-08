const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  nameRoom: { type: String, required: true },
  typeRoom: { type: String, required: true },
  cinemas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cinemas",
  },
  status: { type: Boolean, required: true },
});

const Room = mongoose.model("rooms", roomSchema, "rooms");

module.exports = { roomSchema, Room };
