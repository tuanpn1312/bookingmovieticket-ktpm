const express = require("express");
const roomService = require("../services/room.service");
const Router = express.Router();

Router.get("", roomService.getCinemasRoom);
Router.post("", roomService.newCinemasRoom);
Router.delete("/:id", roomService.deleteRoom);
Router.put("/:id", roomService.updateRoom);
Router.get("/:id", roomService.getRoomById);

/**
 * @swagger
 * /api/rooms:
 *  get:
 *   summary: get all room
 *   description: get all room
 *   responses:
 *    200:
 *     description: list room
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/rooms/616a4e8e266ba33e0fd67681:
 *  delete:
 *   summary: Update status false room
 *   description: Update status false room
 *   responses:
 *    200:
 *     description: update status cinema
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/rooms/616a4e8e266ba33e0fd67681:
 *  put:
 *   summary: Update room
 *   description: Update room
 *   parameters:
 *    - in: body
 *      name: body
 *      required: false
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Rooms'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Rooms'
 *   responses:
 *    200:
 *     description: update room
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/rooms:
 *  post:
 *   summary: create new cinema
 *   description: create new cinema
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Rooms'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Rooms'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * definitions:
 *  Rooms:
 *   type: object
 *   properties:
 *    nameRoom:
 *     type: string
 *     description: name of room
 *     example: 'room-001'
 *    typeRoom:
 *     type: string
 *     description: tyoe of room
 *     example: '2D/Digitals'
 *    cinemaId:
 *     type: string
 *     description: id of cinema
 *     example: '616a47326ddd019db5bdffd9'
 *    status:
 *     type: boolean
 *     description: status of room
 *     example: true
 */

module.exports = Router;
