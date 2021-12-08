const { Ticket } = require("../models/ticket.model");

module.exports.getTickets = async (req, res, next) => {
  try {
    const listTickets = await Ticket.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
    res.status(200).json(listTickets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
