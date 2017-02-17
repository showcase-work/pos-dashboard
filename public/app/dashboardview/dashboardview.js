'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dashboardview', {
        url: '/main',
        template: '<dashboardview></dashboardview>',
      });
  });
