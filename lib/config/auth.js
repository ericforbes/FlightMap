'use strict';

var mongoose = require('mongoose')
var FlightRoutes = mongoose.model('FlightRoute');

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('nope');
  res.send(401);
}

/**
 * Blog authorizations routing middleware
 */
exports.blog = {
  hasAuthorization: function(req, res, next) {
    if (req.blog.creator._id.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    next();
  }
};

exports.flightRoutes = {
	hasAuthorization: function(req, res, next) {
    //Query Db for req.params.flightRouteId
    FlightRoutes.findOne({_id: req.params.flightRouteId}, function(err, doc){
        if (err) return res.send(403);
        if (req.user._id.toString() == doc.creator.toString()){
          next();
        } else {
          return res.send(401);
        }
    });
	}
}