'use strict';

angular.module('dashboardApp')
  .directive('deliveryBarGraph', function () {
    return {
      templateUrl: 'components/delivery/bar-graph/deliveryBarGraph.html',
      restrict: 'EA',
      scope:{
                  graphdata: '=',
            },
      controller: 'deliveryBarGraphController',
      controllerAs: 'deliveryBarGraphController'
    };
  });
