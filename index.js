const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const petRoute = require('./routes/petRoute');
const userRoute = require('./routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.port || 8080;

app.use(cors()); // Enable CORS

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI

app // Main App
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/pets', petRoute)
  .use('/users', userRoute);

// MongoDB Connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});