import type { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Auth Backend v1",
      version: "1.0.0",
      description: "Made using express ts",
      contact: {
        name: "Mohasin",
        email: "mohasin61@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4500/api/v1", // Base URL for your API
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Paths to API docs
};

export default swaggerOptions;
