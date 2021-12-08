const express = require("express");
const showtimesService = require("../services/showtimes.service");
const Router = express.Router();

Router.get("", showtimesService.getShowtimes);
Router.post("", showtimesService.newCinemasShowtimes);
Router.delete("/:id", showtimesService.deleteShowtimes);
Router.put("/:id", showtimesService.updateShowtimes);

/**
 * @swagger
 * /api/showtimes:
 *  get:
 *   summary: get all showtimes 
 *   description: get all showtimes 
 *   responses:
 *    200:
 *     description: list showtimes
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/showtimes/616a51be4e5ecc6d7920cedb:
 *  delete:
 *   summary: Update status false showtimes
 *   description: Update status false showtimes
 *   responses:
 *    200:
 *     description: update status showtimes
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/showtimes/616a51be4e5ecc6d7920cedb:
 *  put:
 *   summary: Update showtime
 *   description: Update showtime
 *   parameters:
 *    - in: body
 *      name: body
 *      required: false
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/ShowTimes'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ShowTimes'
 *   responses:
 *    200:
 *     description: update showtime
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/showtimes:
 *  post:
 *   summary: create new showtime
 *   description: create new showtime
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/ShowTimes'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ShowTimes'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  ShowTimes:
 *   type: object
 *   properties:
 *    movies:
 *     type: string
 *     description: movieID
 *     example: '6164437b90e19f90730aa62f'
 *    cinemas:
 *     type: string
 *     description: cinema ID
 *     example: '616a47326ddd019db5bdffd9'
 *    rooms:
 *     type: string
 *     description: room ID of cinema ID 
 *     example: '616a4ea3266ba33e0fd67686'
 *    startDate:
 *     type: date
 *     description: date of movie showtime room
 *     example: '2021-10-16'
 *    endDate:
 *     type: date
 *     description: date of movie showtime room
 *     example: '2021-10-17'
 *    status:
 *     type: boolean
 *     description: status of room 
 *     example: true
 */

module.exports = Router;
