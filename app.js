// Import required modules
const express = require('express'); // Framework for building web applications
const session = require('express-session'); // Middleware for managing user sessions
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const logger = require('morgan'); // Middleware for logging HTTP requests
const createError = require('http-errors'); // Module for creating HTTP error objects
const path = require('path'); // Module for working with file and directory paths
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const nocache = require('nocache'); // Middleware for disabling caching

// Import route handlers
const indexRouter = require('./routes/index'); // Route handler for homepage
const usersRouter = require('./routes/users'); // Route handler for user management
const loginRouter = require('./routes/login'); // Route handler for user authentication
const welcomeRouter = require('./routes/welcome'); // Route handler for authenticated requests

// Create Express application instance
const app = express();

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views')); // Specify directory for views/templates
app.set('view engine', 'hbs'); // Set the view engine to handlebars

// Use middleware to disable caching
app.use(nocache());

// Use middleware to log requests to console
app.use(logger('dev'));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with url-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use cookie parser middleware for parsing cookies
app.use(cookieParser());

// Use session middleware for session management
app.use(session({
  secret: 'mysecret', // Session secret used to encrypt session data
  resave: false, // Only save session data to store if it has been modified
  saveUninitialized: true, // Save uninitialized sessions to store
  cookie: { secure: false } // Use non-secure cookies (only for development)
}));

// Use login router for handling login requests
app.use('/', loginRouter);

// Use welcome router for handling authenticated requests
app.use('/welcome', welcomeRouter);

// Handle 404 errors by forwarding to error handler. 
// This middleware function generates a 404 error if no other middleware handles the request.
app.use(function (req, res, next) {
  next(createError(404)); // Create and forward a 404 error object to error handler
});

// Error handler middleware
app.use(function (err, req, res, next) {
  // Set locals to provide error data to views
  res.locals.message = err.message; // Error message to display
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Error details for development environments

  // Render the error page
  res.status(err.status || 500); // Set HTTP status code for response
  res.render('error'); // Render the error page using the views/error.hbs template
});

// Export the app instance for use in other files
module.exports = app;
