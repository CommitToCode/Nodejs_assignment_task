
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment_Five",
      version: "1.0.0",
      description: "Ticket Booking System for Movies",
    },
    servers: [
      { url: "http://localhost:3000" },
    
    ],
  },
  apis: ["./app/routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
