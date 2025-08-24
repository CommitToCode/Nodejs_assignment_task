// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment_three",
      version: "1.0.0",
      description: "Product Management API with Categories & Users using MongoDB Aggregation",
    },
    servers: [
      { url: "http://localhost:5000" },

    ],
  },
  apis: ["./app/routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
