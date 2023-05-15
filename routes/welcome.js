// Import the express module and create a router object
var express = require('express');
var router = express.Router();


// Handle GET requests to the root path
router.get('/', function(req, res, next) {

  // Get the username from the session
  const usern = req.session.username

  // If the user is not logged in, redirect to the home page
  if (!req.session.login ){

    res.redirect('/');

  } else {

    // Otherwise, render the welcome page with the user's name
    res.render('welcome',{user : usern, title:"Welcome Page"});

  }
  
});


// Handle POST requests to the root path
router.post('/', function (req, res, next) {

  // Define an array of user data
  var data = [Fayiz = { fname: 'Rihan', uname: 'rihan', pass: "111" }, 
                CJ = { fname: 'Fayiz', uname: 'fayiz', pass: "369" }]

  // Initialize variables to store the user input and authorization status
  let isAuthorise = false

  let username = req.body.username

  let password = req.body.password

  // Loop through the user data and check if the username and password match
  for (let i = 0; i < data.length; i++) {

    if (data[i].fname === username && data[i].pass === password) {

      // If there is a match, set the authorization status to true and store the user's first name
      isAuthorise = true

      var name = data[i]

      req.session.login = true

      req.session.username = name.uname

    }

  }


  // If the user is authorized, redirect to the welcome page
  if (isAuthorise) {

    res.redirect(`/welcome`);

  } 
  // If the username is empty, render the login page with an appropriate message
  else if(!username) {

    res.render('login', { message: 'nothing in username' });

  }
  // If the password is empty, render the login page with an appropriate message
  else if(!password) {

    res.render('login', { message: 'nothing in password' });

  }
  // If the provided credentials are invalid, render the login page with an appropriate message
  else {

    res.render('login', { message: 'Invalid username or password' });
    
  }

});

// Export the router object for use in other parts of the application
module.exports = router;
