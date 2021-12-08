const express = require("express");
const Router = express.Router();
const cinemasService = require("../services/cinemas.service");
const cinemaMiddleWare = require("../middlewares/cinema");

Router.post(
  "/",
  cinemaMiddleWare.checkDuplicateCinemaName,
  cinemasService.createCinemas
);
//get cinemas with status = true
Router.get("/", cinemasService.getCinemas);
//get all cinemas (used by admin)
Router.get("/getAllCinemas", cinemasService.getAllCinemas);
Router.put("/:id", cinemasService.updateCinemas);
Router.delete("/:id", cinemasService.deleteCinemas);
Router.post("/filterCinema", cinemasService.filterCinema);

module.exports = Router;

/**
 * @swagger
 * /api/cinemas/filterCinema:
 *  post:
 *   summary: create new cinema
 *   description: create new cinema
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/CinemasFilter'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CinemasFilter'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/cinemas/616a47326ddd019db5bdffd9:
 *  delete:
 *   summary: Update status false cinema
 *   description: Update status false cinema
 *   responses:
 *    200:
 *     description: update status cinema
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/cinemas/616a47326ddd019db5bdffd9:
 *  put:
 *   summary: Update cinemas
 *   description: Update cinemas
 *   parameters:
 *    - in: body
 *      name: body
 *      required: false
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Cinemas'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Cinemas'
 *   responses:
 *    200:
 *     description: update cinema
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/cinemas/getAllCinemas:
 *  get:
 *   summary: get cinema in system
 *   description: get cinema in system
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/cinemas:
 *  post:
 *   summary: create new cinema
 *   description: create new cinema
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Cinemas'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Cinemas'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  CinemasFilter:
 *   type: object
 *   properties:
 *    id:
 *     type: string
 *     description: id of cinema
 *     example: '616306be07a84d0a6eee5c1a'
 *    movies:
 *     type: string
 *     description: movie id
 *     example: '6157f352903fb27bee579f9d'
 *    startDate:
 *     type: date
 *     description: date
 *     example: '2021-11-11'
 */

/**
 * @swagger
 * definitions:
 *  Cinemas:
 *   type: object
 *   properties:
 *    cinemaName:
 *     type: string
 *     description: name of cinema
 *     example: 'Galaxy Quận 7'
 *    cinemaAddress:
 *     type: string
 *     description: address of cinema
 *     example: 'Quận 7, đường Nguyễn Văn Linh'
 *    cinemaType:
 *     type: string
 *     description: brand of cinema
 *     example: 'Galaxy'
 *    imgUrl:
 *     type: string
 *     description: string img of cinema
 *     example: 'https://assets.glxplay.io/images/plain/categories/1000x1000.png'
 *    status:
 *     type: boolean
 *     description: status of cinema
 *     example: true
 */
