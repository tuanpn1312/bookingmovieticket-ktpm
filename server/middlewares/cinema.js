const { Cinema } = require("../models/cinemas.model");

module.exports.checkDuplicateCinemaName = async (req, res, next) => {
  try {
    const { cinemaName } = req.body;
    const result = await Cinema.findOne({ cinemaName });
    if (result) {
      return res.status(400).json({ message: "Tên rạp phim đã tồn tại" });
    } else {
      return next();
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
};
