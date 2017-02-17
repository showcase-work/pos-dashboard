'use strict';

angular.module('dashboardApp')
  .directive('graph', function () {
    return {
      templateUrl: 'components/graph/graph.html',
      restrict: 'EA',
      scope:{
                  graphdata: '=',
            },
      controller: 'GraphController',
      controllerAs: 'graphController'
    };
  });
