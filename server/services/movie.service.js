const { Movie } = require("../models/movie.model");

module.exports.createMovie = async (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    category: req.body.category,
    startDate: req.body.startDate,
    description: req.body.description,
    movieDuration: req.body.movieDuration,
    movieFormat: req.body.movieFormat,
    trailerUrl: req.body.trailerUrl,
    national: req.body.national,
    movieImg: req.body.movieImg,
    bannerImg: req.body.bannerImg,
    direction: req.body.direction,
    cast: req.body.cast,
    status: req.body.status,
    rating: [],
  });

  movie
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//get movie with status = active
module.exports.getMovies = async (req, res, next) => {
  try {
    const listMovies = await Movie.aggregate([
      { $match: { status: "active" } },
      {
        $lookup: {
          from: "ratings",
          localField: "rating",
          foreignField: "_id",
          as: "rating",
        },
      },
    ]);
    res.status(200).json(listMovies);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//get movie with status = coming soon
module.exports.getMoviesComingSoon = async (req, res, next) => {
  try {
    const listMovies = await Movie.aggregate([
      { $match: { status: "coming soon" } },
      {
        $lookup: {
          from: "ratings",
          localField: "rating",
          foreignField: "_id",
          as: "rating",
        },
      },
    ]);
    res.status(200).json(listMovies);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//get movie with status = now showing
module.exports.getMoviesNowShowing = async (req, res, next) => {
  try {
    const listMovies = await Movie.aggregate([
      { $match: { status: "now showing" } },
      {
        $lookup: {
          from: "ratings",
          localField: "rating",
          foreignField: "_id",
          as: "rating",
        },
      },
    ]);
    res.status(200).json(listMovies);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports.getTopMovie = async (req, res, next) => {
  try {
    const listMovies = await Movie.aggregate([[{ $sample: { size: 6 } }]]);
    res.status(200).json(listMovies);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const listMovies = await Movie.find();
    res.status(200).json(listMovies);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports.updateMovies = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Phim không thể trống!" });
  }

  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Phim không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, { status: "false" }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Phim không tồn tại!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
