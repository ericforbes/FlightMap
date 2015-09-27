'use strict';

var mongoose = require('mongoose'),
  passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function (req, res) {
  console.log("Returns info on user: %j" + req.user.user_info);
  res.json(req.user.user_info);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function (req, res, next) {

  passport.authenticate('local', function(err, user, info) {

    console.log("Here is my user: ", user);
    var error = err || info;
    if (error) { return res.json(400, error); }
    req.logIn(user, function(err) {
      if (err) { return res.send(err); }
      console.log('I logged in');
      res.json(req.user.user_info);
    });
  })(req, res, next);


  /*console.log("haaaa");
  if (req.body.provider == 'facebookLoginStrategy'){

    console.log(req.body.provider);
    passport.authenticate(req.body.provider, function(req, res){
      //wont be call because request is redirected to Facebook.. but will call FacebookCallback!
    });

  } else {

    

  }*/
  
};


exports.facebookLogin = function(req, res, next){
  console.log("session.js -> Hit backend strategy");
  passport.authenticate('facebookLoginStrategy')(req, res, next);
  return;
    //The request is sent to facbeook for auth, so this function isnt called

}



