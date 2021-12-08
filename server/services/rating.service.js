const mongoose = require("mongoose");
const { Movie } = require("../models/movie.model");
const { Rating } = require("../models/rating.model");

//post rating into movie
module.exports.newMovieRating = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    //create a new rating
    const newRating = new Rating(req.body);
    //Get movie
    const movie = await Movie.findById(movieId);
    newRating.movieFilm = movie;
    //save the rating
    await newRating.save();
    //add rating to the movie's movie array 'rating'
    movie.rating.push(newRating);
    //save the movie
    await movie.save();
    res.status(201).json(newRating);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get rating
module.exports.getRating = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const listRating = await Rating.aggregate([
      {
        $match: {
          movieFilm: mongoose.Types.ObjectId(movieId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "account",
          foreignField: "_id",
          as: "account",
        },
      },
    ]);
    res.status(200).json(listRating);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
