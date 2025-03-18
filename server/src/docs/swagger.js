const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/docs/swagger-output.json'; // Output file for the Swagger documentation
const endpointsFiles = [
  './src/routes/index.routes.ts',
];

// Configuration object for Swagger
const doc = {
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'API documentation for your Express project',
  },
  host: 'localhost:3000', // Your server's host
  basePath: '/', // Base path for your API
  schemes: ['http'], // Supported schemes (http or https)
  consumes: ['application/json'], // Request content types
  produces: ['application/json'], // Response content types
  tags: [
    // {
    //   name: 'Users',
    //   description: 'Operations related to users',
    // },
  ],
  definitions: {
    // User: {
    //   id: 1,
    //   name: 'John Doe',
    // },
  },
};

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);