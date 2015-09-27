'use strict';

angular.module('angularPassportApp')
  .factory('FlightRoutes', function ($resource) {
    return $resource('/api/flightRoutes/:flightRouteId',
    	{
    		flightRouteId: '@_id'
    	});
  });




/*

'use strict';

angular.module('angularPassportApp')
  .factory('FlightRoutes', function ($resource) {
    return $resource('/api/flightRoutes/',
        {
            //Default parameters go here
        },
        {
            remove: {
                method: 'DELETE',
                params: {flightRouteId: '@_id'},
                url: '/api/flightRoutes/:flightRouteId'
            }
        });
  });
*/