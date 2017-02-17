'use strict';

angular.module('dashboardApp')
  .directive('deliveryPieChart', function () {
    return {
      templateUrl: 'components/delivery/pie-chart/deliveryPieChart.html',
      restrict: 'EA',
      scope:{
                  graphdata: '=',
            },
      controller: 'deliveryPieChartController',
      controllerAs: 'deliveryPieChartController'
    };
  });
