const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pets API',
    description: 'Project for CSE341',
  },
  host: 'cse341pets.onrender.com',
  //host: 'cse341pets.onrender.com/users',
};

const outputFile = './swagger.json';
const routes = ['./routes/petRoute.js', './routes/userRoute.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);