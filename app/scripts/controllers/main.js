'use strict';

angular.module('angularPassportApp')
  .controller('MainCtrl', function ($scope, FlightRoutes) {

  	//Input fields
  	$scope.newFlight = {}
    
    //Upon controller initialization
    reloadFlightData();

  	$scope.flightData = [];

    $scope.flightRowHover = function(flightData){
      return flightData.showDelete = !flightData.showDelete;
    }

    $scope.deleteFlight = function(flightData){
      flightData.frank = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      flightData.$remove(function(err){
        if (err){
          return;
        }

        //for (var i in $scope.flightData) {
        //if ($scope.flightData[i] == flightData) {
        //  $scope.flightData.splice(i, 1);
        //}
        //}
      });
    }

  	$scope.addFlight = function(form) {

  		var route = new FlightRoutes({
  			description: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  			date: new Date(),
  			to: "BWI",
  			from: "SEA"
  		});
      console.log("about to save");
  		route.$save(function(resp){
  			console.log(resp);
  		});
    };

    function reloadFlightData(){
      FlightRoutes.query(function(resp){
        console.log(resp);
        $scope.flightData = resp;
      });
    }

  });
