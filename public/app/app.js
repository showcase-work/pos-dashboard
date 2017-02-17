'use strict';

angular.module('dashboardApp', [
  'dashboardApp.auth',
  'ui.router',
  'ui.bootstrap',
  'nvd3',
  'ngBootstrap',
  'rzModule',
  'ngToast',
  'ngCsv'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
  });/*required for ui-router to take over the routing*/