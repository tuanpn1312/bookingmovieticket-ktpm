const express = require("express");
const Router = express.Router();
const movieTicketService = require("../services/ticket.service");
const authMiddleware = require("../middlewares/auth");

Router.get(
  "/",
  authMiddleware.authenticateToken,
  movieTicketService.getTickets
);

/**
 * @swagger
 * /api/tickets:
 *  get:
 *   summary: get all ticket of user is login
 *   description: get all ticket of user is login
 *   responses:
 *    200:
 *     description: list tickets
 *    500:
 *     description: error servers
 */

module.exports = Router;
