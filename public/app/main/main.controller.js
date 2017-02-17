'use strict';

(function() {

angular.module('dashboardApp')
  .component('main', {
    controller: MainController
  });

function MainController($http, $state, Auth) {

    var loggedIn = Auth.isLoggedIn();
    /*if(loggedIn)
    {*/
      $state.go("dashboard.dashboardview");
    /*}*/
}

})();
