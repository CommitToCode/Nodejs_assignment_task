
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment_one",
      version: "1.0.0",
      description: "MongoDB-Based Quiz Management System with User Authentication, Category-Wise Multiple-Choice Questions, and Aggregation Queries",
    },
    servers: [
      { url: "http://localhost:3006" },
      
    ],
  },
  apis: ["./app/routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
