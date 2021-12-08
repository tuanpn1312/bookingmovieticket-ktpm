const express = require("express");

const userRoute = require("../routes/user.route");
const movieRoute = require("../routes/movie.route");
const ratingRoute = require("../routes/rating.route");
const ticketRoute = require("../routes/ticket.route");
const cinemasRoute = require("../routes/cinemas.route");
const roomRoute = require("../routes/room.route");
const showtimesRoute = require("../routes/showtimes.route");
const billRoute = require("../routes/bill.route");
const Router = express.Router();

Router.use("/users", userRoute);
Router.use("/movies", movieRoute);
Router.use("/ratings", ratingRoute);
Router.use("/tickets", ticketRoute);
Router.use("/cinemas", cinemasRoute);
Router.use("/rooms", roomRoute);
Router.use("/showtimes", showtimesRoute);
Router.use("/bills", billRoute);

module.exports = Router;
