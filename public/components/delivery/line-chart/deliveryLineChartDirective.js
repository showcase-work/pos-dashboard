'use strict';

angular.module('dashboardApp')
  .directive('deliveryLineChart', function () {
    return {
      templateUrl: 'components/delivery/line-chart/deliveryLineChart.html',
      restrict: 'EA',
      scope:{
                  graphdata: '=',
            },
      controller: 'deliveryLineChartController',
      controllerAs: 'deliveryLineChartController'
    };
  });
