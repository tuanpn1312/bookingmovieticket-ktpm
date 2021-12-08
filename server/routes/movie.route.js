const express = require("express");
const movieMiddleWare = require("../middlewares/movie");
const movieService = require("../services/movie.service");
const Router = express.Router();

Router.post("/", movieMiddleWare.checkDuplicateTitle, movieService.createMovie);
//get film with status = active
Router.get("/", movieService.getMovies);
Router.get("/nowshowing", movieService.getMoviesNowShowing);
Router.get("/comingsoon", movieService.getMoviesComingSoon);
//get all film for admin
Router.get("/getallmovie", movieService.getAllMovies);
Router.put("/:id", movieService.updateMovies);
Router.delete("/:id", movieService.deleteMovie);
//get top film
Router.get("/topmovies", movieService.getTopMovie);

/**
 * @swagger
 * /api/movies/615b22cb310779e04d4e8198:
 *  put:
 *   summary: Update movie
 *   description: Update movie
 *   parameters:
 *    - in: body
 *      name: body
 *      required: false
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Movies'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Movies'
 *   responses:
 *    200:
 *     description: update movie
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies/615b22cb310779e04d4e8198:
 *  delete:
 *   summary: Update status false movie
 *   description: Update status false movie
 *   responses:
 *    200:
 *     description: update status movie
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies/topmovies:
 *  get:
 *   summary: get top rating
 *   description: get top rating
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies/getallmovie:
 *  get:
 *   summary: get all movies
 *   description: get all movies
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies/comingsoon:
 *  get:
 *   summary: get list movies are comingsoon
 *   description: get list movies are comingsoon
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies/nowshowing:
 *  get:
 *   summary: get list movies are nowshowing
 *   description: get list movies are nowshowing
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/movies:
 *  get:
 *   summary: get list movies are active
 *   description: get list movies are active
 *   responses:
 *    200:
 *     description: list movies
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  Movies:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     description: title of movie
 *     example: 'Trạng Tí Mới'
 *    category:
 *     type: string
 *     description: category of movie
 *     example: 'Hành động'
 *    startDate:
 *     type: date
 *     description: date of movie for watching
 *     example: '10-4-2021'
 *    description:
 *     type: string
 *     description: description of movie
 *     example: 'Đây là phim hay'
 *    movieDuration:
 *     type: number
 *     description: duration of movie
 *     example: 80
 *    movieFormat:
 *     type: string
 *     description: 2D or 3D of movie
 *     example: '2D'
 *    trailerUrl:
 *     type: string
 *     description: link trailer of movie
 *     example: 'https://youtu.be/sx1ROHCmY-4'
 *    national:
 *     type: string
 *     description: nation of movie
 *     example: 'Việt Nam'
 *    movieImg:
 *     type: string
 *     description: string img of movie
 *     example: 'https://image.thanhnien.vn/1024/uploaded/ngocthanh/2021_02_09/01-anh-noi-bat_jfoc.jpg'
 *    bannerImg:
 *     type: string
 *     description: nation of movie
 *     example: 'https://image.thanhnien.vn/1024/uploaded/ngocthanh/2021_02_09/01-anh-noi-bat_jfoc.jpg'
 *    direction:
 *     type: string
 *     description: direction of movie
 *     example: 'Nguyễn Đức Mạnh'
 *    cast:
 *     type: string
 *     description: direction of movie
 *     example: 'Nguyễn Đức Mạnh, Nguyễn Minh Thuận'
 *    status:
 *     type: string
 *     enum: ["active", "now showing", "coming soon"]
 *     description: status of movie, enum = [active, now showing, comming soon]
 *     example: 'active'
 */

/**
 * @swagger
 * /api/movies:
 *  post:
 *   summary: create new movie
 *   description: create new movie
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Movies'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Movies'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

module.exports = Router;
