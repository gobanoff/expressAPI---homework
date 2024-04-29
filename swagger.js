const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Shop API',
        version: '1.0.0',
        description: 'REST API for managing a shop and its items',
    },
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['./app.js'], // Path to the API routes file(s)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
