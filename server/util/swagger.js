const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Booking Movie Ticket",
      description: "Booking Movie Ticket",
      contact: {
        name: "Booking Movie Ticket",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./server/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs };
