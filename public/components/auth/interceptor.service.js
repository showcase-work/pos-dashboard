'use strict';

(function() {
  
angular.module('dashboardApp.auth')
  .factory('authInterceptor', authInterceptor);

function authInterceptor($rootScope, $q, $cookies, $injector, $window) {
  var state;
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      if ($cookies.get('user_details')) {
        config.headers.Authorization = /*'Bearer ' + */JSON.parse($cookies.get('user_details')).token;
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        // remove any stale tokens
        $cookies.remove('token');
        $window.location="/";
      }
      return $q.reject(response);
    }
  };
}

})();
