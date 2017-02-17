'use strict';

angular.module('dashboardApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('logout', {
        url: '/logout?',
        template: '',
        controller: function($state, Auth, $window) {
          Auth.logout();
          /*window.open('/', '_self', '');
          window.close();*/
          //$window.location="/";
        }
      })
  })
