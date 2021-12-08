const { Movie } = require("../models/movie.model");

module.exports.checkDuplicateTitle = async (req, res, next) => {
  try {
    const { title } = req.body;
    const result = await Movie.findOne({ title });
    console.log(result);
    if (result) {
      return res.status(400).json({ message: "Tên phim đã tồn tại" });
    } else {
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};
