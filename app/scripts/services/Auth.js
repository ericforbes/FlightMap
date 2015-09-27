'use strict';

angular.module('angularPassportApp')
  .factory('Auth', function Auth($location, $rootScope, Session, FacebookSession, User, FlightRoutes, $cookieStore) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;

        Session.save({
            provider: provider,
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
          }, function(user) {
            console.log("Setting rootscope");
            $rootScope.currentUser = user;
            return cb();
          }, function(err) {
            return cb(err.data);
          }
        );
      },

      

      facebookLogin: function(callback){
        var cb = callback || angular.noop;
        console.log("Auth.js -> About to post FacebookSession");
        FacebookSession.save(function(doc){
          console.log("Here is the currnet user");
          console.log(doc);
          console.log("Saved the session.");
          $rootScope.currentUser = doc;
          return cb();
        }, function(err){
          console.log("there was an isuse");
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function(res) {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      addFlight: function(data, callback){
        var cb = callback || angular.noop;
        FlightRoutes.save(data, function(route){
          return cb(route, null)
        }, function(err){
          return cd(null, err.data);
        });
      },

      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        User.save(userinfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      currentUser: function() {
        console.log('here');
        Session.get(function(user) {
          console.log("here is my session user: %j" + user);
          $rootScope.currentUser = user;
        });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
            console.log('password changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        User.delete({
          email: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      }
    };
  }
);