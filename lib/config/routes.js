'use strict';

var path = require('path'),
    auth = require('../config/auth'),
    passport = require('passport');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  //Local Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);


  //Facebook Session Routes + extended permission
  app.get('/auth/facebook', passport.authenticate('facebookLoginStrategy'), function(req, res){
    console.log("FacebookAuth");
    //The request is sent to facbeook for auth, so this function isnt called
  });
  app.post('/auth/facebook', session.facebookLogin);
  /*app.get('/auth/facebook/callback',
    passport.authenticate('facebookLoginStrategy', { successRedirect : '/', failureRedirect: '/login' }),
    function(req, res) {
      console.log("ending response");
      res.redirect('/');
    });*/
  app.get('/auth/facebook/callback',
    passport.authenticate('facebookLoginStrategy', {failureRedirect: '/loginnnnnnnnnnnnnnnnnnnnnn'}), function(req, res){
      console.log('/auth/facebook/callback');
      console.log(req.user);
      req.logIn(req.user, function(err) {
        if (err) { return res.send(err); }
        console.log("Facebook User successfully logged in");
        res.json(req.user.user_info);
      });
      res.redirect('/');
    });
  //app.get('/auth/facebook/callback', session.facebookCallback, session.facebookCallbackSuccess);


  // Flight Route API routes
  var flightRoutes = require('../controllers/flightroutes')
  app.post('/api/flightRoutes', auth.ensureAuthenticated, flightRoutes.create)
  app.get('/api/flightRoutes', auth.ensureAuthenticated, flightRoutes.allFromUser);
  //app.put('/api/flightRoutes/:flightRouteId', auth.ensureAuthenticated, auth.blog.hasAuthorization, flightRoutes.update)
  app.del('/api/flightRoutes/:flightRouteId', auth.ensureAuthenticated, auth.flightRoutes.hasAuthorization, flightRoutes.destroy)


  // Blog Routes
  var blogs = require('../controllers/blogs');
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.del('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);

  //Setting up the blogId param
  app.param('blogId', blogs.blog);

  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    //Main angular page, loads all angular resources + does routing
    res.render('index.html');
  });

}