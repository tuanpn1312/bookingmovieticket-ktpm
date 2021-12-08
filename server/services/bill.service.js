const moment = require("moment");
const { Bill } = require("../models/bill.model");
const { User } = require("../models/user.model");
const { Showtime } = require("../models/showtimes.model");
const { Ticket } = require("../models/ticket.model");
const mongoose = require("mongoose");

module.exports.createBill = async (req, res, next) => {
  try {
    const { id } = req.user.user;
    const { cinemaName, movieTitle, seat, room, showTimeId, price, showTime } =
      req.body;

    const amountTicket = seat.length;

    const bill = new Bill({
      cinemaName: cinemaName,
      movieTitle: movieTitle,
      seat: seat,
      room: room,
      showTimeId: showTimeId,
      price: price * amountTicket,
      showTime: showTime,
      users: id,
      checkoutDate: moment(new Date())
        .locale("vi")
        .format("YYYY-MM-DD HH:mm:ss"),
      status: true,
    });

    await bill.save();

    const listSeats = await Showtime.findById(showTimeId);

    for (let i = 0; i < seat.length; i++) {
      const ticket = {
        cinemaName: cinemaName,
        movieTitle: movieTitle,
        seat: seat[i],
        room: room,
        showTimeId: showTimeId,
        price: price,
        showTime: showTime,
        users: id,
        checkoutDate: moment(new Date())
          .locale("vi")
          .format("YYYY-MM-DD HH:mm:ss"),
        status: true,
      };

      const newSeats = listSeats.seats.map((item) => {
        if (item.id === seat[i]) {
          item.status = true;
        }
        return item;
      });

      const newticket = new Ticket(ticket);
      await newticket.save();

      await Showtime.findByIdAndUpdate(
        showTimeId,
        { seats: newSeats },
        {
          useFindAndModify: false,
        }
      );
    }

    const user = await User.findById(id);

    const { fullName, userName, age, phone } = user;

    const data = {
      cinemaName: cinemaName,
      movieTitle: movieTitle,
      seat: seat,
      room: room,
      price: price * amountTicket,
      showTime: showTime,
      checkoutDate: moment().locale("vi").format("LLL"),
      fullName: fullName,
      userName: userName,
      age: age,
      phone: phone,
    };

    res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getBills = async (req, res, next) => {
  try {
    const listBills = await Bill.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
    res.status(200).json(listBills);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getBillsById = async (req, res, next) => {
  try {
    const { id } = req.user.user;
    const string = new mongoose.Types.ObjectId(id);
    const listBills = await Bill.aggregate([
      { $match: { users: string } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
    res.status(200).json(listBills);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
