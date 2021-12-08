const express = require("express");
const ratingService = require("../services/rating.service");
const Router = express.Router();
const authMiddleware = require("../middlewares/auth");

Router.post("", authMiddleware.authenticateToken, ratingService.newMovieRating);
//get rating and user with id movie
Router.get("/:id", ratingService.getRating);

module.exports = Router;

/**
 * @swagger
 * /api/ratings/6157f352903fb27bee579f9d:
 *  get:
 *   summary: get rating of 1 movie
 *   description: get rating of 1 movie
 *   responses:
 *    200:
 *     description: movie with list rating
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/ratings:
 *  post:
 *   summary: create new cinema
 *   description: create new cinema
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  Ratings:
 *   type: object
 *   properties:
 *    movieId:
 *     type: string
 *     description: movie of cinema
 *     example: '6157f716903fb27bee579fa6'
 *    description:
 *     type: string
 *     description: content of rating
 *     example: 'Phim xuất sắc'
 *    star:
 *     type: number
 *     description: star of movie 
 *     example: 9
 *    rateDate:
 *     type: string
 *     description: time of rating
 *     example: 'Friday, September 24, 2021'
 *    account:
 *     type: object
 *     description: id account of rating
 *     example: {_id: "615a52e324a0572eefc27576"}
 */