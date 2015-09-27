'use strict';

angular.module('angularPassportApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.error = {};
    $scope.user = {};

    $scope.showLoginPartial = true;

    $scope.setLoginPartial = function(bool){
      $scope.showLoginPartial = bool;
    }

    $scope.facebookLogin = function(){

      $window.location = "http://localhost:9000/auth/facebook";
      console.log($window.location)
      return;
      console.log('h');
      Auth.facebookLogin(function(err){
        $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    }

///CHANGE THE AUTH.LOGIN ( STRATEGY NAME, {},)


    $scope.login = function(form) {
      Auth.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };

  $scope.register = function(form) {
    console.log('register');
      Auth.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };

  });