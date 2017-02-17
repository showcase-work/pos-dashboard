'use strict';

angular.module('dashboardApp')
  .directive('piechart', function () {
    return {
      templateUrl: 'components/pie-chart/pie-chart.html',
      restrict: 'EA',
      scope:{
                  graphdata: '=',
            },
      controller: 'PieChartController',
      controllerAs: 'PieChartController'
    };
  });
