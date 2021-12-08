const { Showtime } = require("../models/showtimes.model");
const { Cinema } = require("../models/cinemas.model");
const { Movie } = require("../models/movie.model");

//get showtime by showtimeId
module.exports.getShowtimes = async (req, res, next) => {
  //handdler
  try {
    const listShowtimes = await Showtime.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movies",
          foreignField: "_id",
          as: "movies",
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "rooms",
          foreignField: "_id",
          as: "rooms",
        },
      },
      {
        $lookup: {
          from: "cinemas",
          localField: "cinemas",
          foreignField: "_id",
          as: "cinemas",
        },
      },
    ]);
    res.status(200).json(listShowtimes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//create showtime into cinemas
module.exports.newCinemasShowtimes = async (req, res, next) => {
  //handdler
  try {
    const { cinemas } = req.body;
    //create a new showtimes
    const newShowtime = new Showtime(req.body);
    //get cinema
    const cinema = await Cinema.findById(cinemas);
    newShowtime.cinemas = cinema;
    //add showtime to the cinema's cinema array 'showtime'
    cinema.showtimes.push(newShowtime);
    //save the showtimes
    await newShowtime.save();
    //save the cinema
    await cinema.save();
    res.status(201).json(newShowtime);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateShowtimes = async (req, res, next) => {
  //handdler update room
  if (!req.body) {
    return res.status(400).send({ message: "Lịch chiếu không thể trống!" });
  }

  const id = req.params.id;
  Showtime.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Lịch chiếu không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.deleteShowtimes = async (req, res, next) => {
  //handdler delete cinemas
  try {
    const id = req.params.id;
    Showtime.findByIdAndUpdate(id, { status: "false" }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Lịch chiếu không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
