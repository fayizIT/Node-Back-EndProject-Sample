var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  if (req.session.login) {

    res.redirect('/welcome');

  } else {

    res.render('login', { title: "login page" });

  }

});

router.post('/', function (req, res, next) {

  req.session.destroy()

  res.redirect('/');
  
});

module.exports = router;
