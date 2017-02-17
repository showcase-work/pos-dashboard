'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.orders', {
        url: '/orders',
        template: '<orders></orders>'
      });
  });
