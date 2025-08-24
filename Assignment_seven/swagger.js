// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment_seven",
      version: "1.0.0",
      description: "Daily Task To-Do Planner",
    },
    servers: [
      { url: "http://localhost:8000" },
    ],
  },
  apis: ["./app/routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
