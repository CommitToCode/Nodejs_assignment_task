// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment_Four",
      version: "1.0.0",
      description: "Blog Management System with User Authentication, Profile Management, and Aggregation-based Queries in MongoDB",
    },
    servers: [
      { url: "http://localhost:2809" },
    
    ],
  },
  apis: ["./app/routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
