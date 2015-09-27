'use strict';

angular.module('angularPassportApp')
  .factory('FacebookSession', function ($resource) {
  	console.log("FacebookSession.js -> Returning resource to POST to");
    return $resource('/auth/facebook/');
  });
