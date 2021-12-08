const { Cinema } = require("../models/cinemas.model");
const mongoose = require("mongoose");
module.exports.createCinemas = async (req, res, next) => {
  //handdler create cinemas
  const cinema = new Cinema({
    cinemaName: req.body.cinemaName,
    cinemaAddress: req.body.cinemaAddress,
    cinemaType: req.body.cinemaType,
    showtimes: [],
    rooms: [],
    imgUrl: req.body.imgUrl,
    status: req.body.status,
  });

  try {
    cinema.save().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports.filterCinema = async (req, res, next) => {
  try {
    const id = req.body.id;
    const movies = req.body.movies;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1,
        0,
        0,
        0,
        0
      )
    );
    const string = new mongoose.Types.ObjectId(id);
    const moviesId = new mongoose.Types.ObjectId(movies);
    console.log(moviesId);
    console.log(string);
    const listCinemas = await Cinema.aggregate([
      {
        $match: {
          _id: string,
        },
      },

      {
        $lookup: {
          from: "showtimes",
          pipeline: [
            {
              $match: {
                $and: [
                  { cinemas: string },
                  { status: true },
                  { movies: moviesId },
                  {
                    startDate: {
                      $gt: startDate,
                      $lt: endDate,
                    },
                  },
                ],
              },
            },
          ],
          as: "showtimes",
        },
      },
      {
        $lookup: {
          from: "rooms",
          pipeline: [
            {
              $match: {
                $and: [{ cinemas: string }, { status: true }],
              },
            },
          ],
          as: "rooms",
        },
      },
    ]);
    res.status(200).json(listCinemas);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get cinemas with status = true
module.exports.getCinemas = async (req, res, next) => {
  //handdler get list cinemas
  try {
    const listCinemas = await Cinema.aggregate([
      { $match: { status: true } },
      {
        $lookup: {
          from: "showtimes",
          pipeline: [{ $match: { status: true } }],
          as: "showtimes",
        },
      },
      {
        $lookup: {
          from: "rooms",
          pipeline: [{ $match: { status: true } }],
          as: "rooms",
        },
      },
    ]);
    res.status(200).json(listCinemas);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get all cinemas (used by admin)
module.exports.getAllCinemas = async (req, res, next) => {
  //handdler get all list cinemas
  try {
    const listCinemas = await Cinema.find();
    res.status(200).json(listCinemas);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports.updateCinemas = async (req, res, next) => {
  //handdler update cinemas
  if (!req.body) {
    return res.status(400).send({ message: "Rạp phim không thể trống!" });
  }

  const id = req.params.id;
  Cinema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Rạp phim không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.deleteCinemas = async (req, res, next) => {
  //handdler delete cinemas
  const id = req.params.id;
  Cinema.findByIdAndUpdate(id, { status: "false" }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Rạp phim không tồn tại!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
