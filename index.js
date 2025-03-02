const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');
const petRoute = require('./routes/petRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./error/errorHandler');
const session = require('express-session');
const passport = require('./auth/github'); 

const app = express();
const port = process.env.PORT || 8080;
const options = {
  swaggerOptions: {
    oauth: {
      clientId: process.env.LOCAL_CLIENT_ID,
      clientSecret: process.env.LOCAL_SECRET,
    }
  }
};

// Middleware
app.use(cors());
app.use(express.json());


// **Session Middleware (Required for OAuth)**
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'your_secret_key', 
  resave: false, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/pets', petRoute);
app.use('/users', userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/auth', authRoute);
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear session cookie
      res.redirect('/'); // Redirect to homepage or login page
    });
  });
});

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});