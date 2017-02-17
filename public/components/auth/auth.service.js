'use strict';

(function() {

angular.module('dashboardApp.auth')
  .factory('Auth', AuthService);


function AuthService($location, $http, $cookies, $q, $window) {
  var currentUser = {};

  if ($cookies.get('user_details') && $location.path() !== '/logout') {
    currentUser = JSON.parse($cookies.get('user_details'));
  }
  else
  {
    console.log("user not set")
    //$window.location="/";
  }

  var Auth = {
    /**
     * Delete access token and user info
     */
    logout: function() {
      $cookies.remove('user_details');
      currentUser = {};
    },
    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    getCurrentUser: function(callback) {
      if (arguments.length === 0) {
        return currentUser;
      }
      var value = (currentUser.hasOwnProperty('$promise')) ?
        currentUser.$promise : currentUser;
      return $q.when(value)
        .then(function(user){
          return user;
        }, function(){
          return {};
        });
        
    },

    isLoggedIn: function(callback) {
      if (arguments.length === 0) {
        return currentUser.hasOwnProperty('cloud_site_id');
      }
    },

    getToken: function() {
      return currentUser.token;
    },

  };
  return Auth;
}

})();
