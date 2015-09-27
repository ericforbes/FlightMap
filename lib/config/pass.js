'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = mongoose.model('User'),
    FacebookUser = mongoose.model('FacebookUser');

// Serialize sessions. User parameter is a db record
passport.serializeUser(function(doc, done) {
  console.log("Serializing...");
  
  //Serialize and store session/req data for user
  //Store uid if facebook
  //Store id if login
  if (doc.fbUid){
    console.log("serializing a fb user");
    //Serialize a facebook session
    done(null, doc.fbUid);
  } else {
    console.log("serializing a local user");
    //Serialize a local login session
    done(null, doc.id);
  }
});

passport.deserializeUser(function(id, done) {
  console.log('Deserializing user...');
  //Try to query the Facebook DB first because id from facebook first
  FacebookUser.findOne({fbUid: id}, function(err, doc){
    if (err) done(err, null);
    if (!doc){
      User.findOne({_id: id}, function(err, doc){
        if (!err) done(err, doc);
        console.log('...LocalLogin user!');
        done(err, null);
      });
    } else {
      console.log('...Facebook user!');
      done(err, doc);
    }
  });

  //console.log("DESERIA");
  //if (id.indexOf('FACEBOOKID') > -1){
    //What are we storing? profile id? session ID, what?
    //FacebookUser.find
  //} else {
    //User.findOne({ _id: id }, function (err, user) {
      //console.log("DESS");
      //done(err, user);
    //});
  //}
  
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          'errors': {
            'email': { type: 'Email is not registered.' }
          }
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          'errors': {
            'password': { type: 'Password is incorrect.' }
          }
        });
      }
      return done(null, user);
    });
  }
));

passport.use('facebookLoginStrategy', new FacebookStrategy(
  {
    clientID: '680941325361042',
    clientSecret: 'cf59d6af68382045459acb2d7bead6ab',
    callbackURL: 'http://localhost:9000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'link']
  },
  function(accessToken, refreshToken, profile, done){
    console.log(accessToken);
    console.log(profile);
    console.log(profile.displayName);

    var query = {'fbUid': profile.id};
    var update = {accessToken: accessToken, fbUid: profile.id, displayName: profile.displayName, profileUrl: profile.profileUrl};
    var options = {new: false, upsert: true};

    FacebookUser.findOneAndUpdate(
      query,
      update,
      options,
      function (err, doc) {
        console.log('FacebookUser.findOneAndUpdate()');
        if (err) {
          console.log("There is an error after db fetch");
          console.log(err);
          return done(err);
        }
        //console.log(err);
        return done(null, doc);
      }
    );


    //return done(null, doc);
    //User.findOrCreate({}, function(err, user){
    //   if (err) {return done(err); }
    //  done(null, user);
    //});
    //return done();
    //return done(null, profile);
  }
));

