'use strict';

var mongoose = require('mongoose')
var FlightRoute = mongoose.model('FlightRoute');


/**
 * Create a flight route
 */
 exports.create = function(req, res) {
  var route = new FlightRoute(req.body);
  route.creator = req.user;
  console.log("created");

  route.save(function(err){
    if (err){
      res.json(500, err);
    } else {
      res.json(route);
    }
  });
 };

 /**
 * List of Blogs
 */
exports.allFromUser = function(req, res) {
	console.log(req.user);
	var query = FlightRoute.find({creator: req.user}).sort('-date');
  	query.exec(sendResponseData);

  	function sendResponseData(err, flights){
  		if (err) {
  			console.log('err');
  			res.json(500, err);
  		} else {
  			console.log(flights);
  			console.log('responding with flight routes');
  			if (!flights) res.json("n");
  			res.json(flights);
  		}
  	}
};


exports.destroy = function(req, res){
	//Delete the flight route
}

