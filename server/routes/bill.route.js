const express = require("express");
const Router = express.Router();
const billService = require("../services/bill.service");
const authMiddleware = require("../middlewares/auth");

Router.post("/", authMiddleware.authenticateToken, billService.createBill);

Router.get("/", authMiddleware.authenticateToken, billService.getBills);

Router.get(
  "/findBillById",
  authMiddleware.authenticateToken,
  billService.getBillsById
);
module.exports = Router;

/**
 * @swagger
 * /api/bills:
 *  get:
 *   summary: get all bills of user is login
 *   description: get all bills of user is login
 *   responses:
 *    200:
 *     description: list bills
 *    500:
 *     description: error servers
 */
/**
 * @swagger
 * /api/bills:
 *  post:
 *   summary: create new bill
 *   description: create new bill
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Bills'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Bills'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  Bills:
 *   type: object
 *   properties:
 *    cinemaName:
 *     type: string
 *     description: name of movie
 *     example: 'Hùng Vương'
 *    movieTitle:
 *     type: string
 *     description: title of movie
 *     example: 'movieTitle'
 *    seat:
 *     type: array
 *     description: seat user choose
 *     example: [1, 2]
 *    room:
 *     type: string
 *     description: name of room
 *     example: 'room-02'
 *    showTimeId:
 *     type: object
 *     description: id of showtime
 *     example: '616ae9b997ba1144b18e90b5'
 *    price:
 *     type: object
 *     description: price of showTime
 *     example: '12345646'
 *    showTime:
 *     type: date
 *     description: time of showTime start with hours
 *     example: '2021-10-09'
 */
