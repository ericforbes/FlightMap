'use strict';

var mongoose = require('mongoose'),
  FacebookUser = mongoose.model('FacebookUser'),
  passport = require('passport'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create facebook user
 * requires: {id, displayName}
 * returns: {displayName}
 */
exports.create = function (req, res, next) {
  var newFacebookUser = new FacebookUser(req.body);
  newFacebookUser.provider = 'facebook';
  console.log('Creating a new facebook user');

  newFacebookUser.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    req.logIn(newFacebookUser, function(err) {
      if (err) return next(err);
      return res.json(newUser.user_info);
    });
  });
};

/**
 *  Facebook ID exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
  var facebookId = req.params.facebookId;
  FacebookUser.findOne({ id : facebookId }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load FacebookUser ID ' + facebookId));
    }

    if(user) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
}
