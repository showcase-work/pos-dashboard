'use strict';

angular.module('dashboardApp')
  .controller('GraphController', graphController);

function graphController($scope, Orders) {

      var vm = this;
      function getWeekNumber(weeknumberdate) {

        var weekNumber = parseInt(weeknumberdate.substring(0,2));
      
        var year = 2016;
        var week = weekNumber
        var d = new Date("Jan 01, "+year+" 01:00:00");
        var w = d.getTime() -(3600000*24*(6-1))+ 604800000 * (week)
        var n1 = new Date(w);
        var n2 = new Date(w + 518400000)


        return d3.time.format('%e %B')(n1)+' - '+d3.time.format('%e %B')(n2);

      }

      function getDateFormat() {
        switch(Orders.filters.date_type) {

              case "Day":
                 var date_format = "%e-%B %y (%a)";
                 break;
              case "Year":
                 var date_format = "%Y";
                 break;
              case "Month":
                 var date_format = "%B %y";
                 break;
              case "Hour":
                 var date_format = "%I%p %e-%B";
                 break;
           }
           return date_format;
      }

      vm.test = 0;
      vm.test2 = 0;

      vm.data = [
          {
              "key" : "Revenue" ,
              "bar": true,
              "values": []
          },
          {
              "key" : "Orders" ,
              "values": []
          }
                    ]
          vm.data[0].values = $scope.graphdata.revenue_for_graph
          vm.data[1].values = $scope.graphdata.orders_for_graph

          var checkDataValues = vm.graphdata
          $scope.$watch(function(checkDataValues){
              vm.data2 = vm.data[0].values;
              vm.data[0].values = $scope.graphdata.revenue_for_graph;
              vm.data[1].values = $scope.graphdata.orders_for_graph
          })


      vm.data2 = vm.data[0].values;

      vm.options = {
                  chart: {
                      type: 'linePlusBarChart',
                      /*height: 333,  
                      height2:0,*/
                      margin: {
                          top: 30,
                          right: 75,
                          bottom: 50,
                          left: 75
                      },
                      legendRightAxisHint:" Count",
                      focusEnable: false,
                      focusHeight:0,
                      clipEdge:false,
                      bars: {
                                forceY: [0, null],
                                //clipEdge:false
                            },
                      bars2:{
                                forceY: [0]
                            },
                      lines: { // for line chart
                              forceY: [0],
                              /*yDomain: [0,1],
                              yRange: [0,10]*/
                          },
                      color: [$scope.graphdata.colors[0], $scope.graphdata.colors[1]],
                      
                      x: function(d,i) {
                        vm.test = d.x;
                        return i },

                      y: function(d,i) {
                        vm.test2 = i;
                        return d.y;
                      },

                      xAxis: {
                          axisLabel: "Date",
                          tickFormat: function(d) {

                            if(Orders.filters.date_type=="Week"){
                              var dx = vm.data[0].values[d] && vm.data[0].values[d].x || vm.data2[vm.test2] && vm.data2[vm.test2].x || 0;
                             

                              if (dx) {
                              return getWeekNumber(dx);
                              }
                              if(vm.test != undefined){
                                return getWeekNumber(vm.test);
                              }

                            }
                            else{
                              var dx = vm.data[0].values[d] && vm.data[0].values[d].x || vm.data2[vm.test2] && vm.data2[vm.test2].x || 0;
                                if (dx > 0) {
                                    return d3.time.format(getDateFormat())(new Date(dx))
                                }
                                
                                if(vm.test != undefined){
                                    return d3.time.format(getDateFormat())(new Date(vm.test))/*+'<br />Revenue:'*/;
                                }
                            }
  
                          },
                          showMaxMin:false,
                          clipEdge:false,
                      },

                      y1Axis: {
                                axisLabel: 'Revenue',
                                tickFormat: function(d){

                                    function shortenByIndianFormat(val) {
                                      if(val >= 10000000) 
                                        {val = (val/10000000).toFixed(1) + 'Cr';}
                                      else if(val >= 100000) val = (val/100000).toFixed(1) + 'L';
                                      else if(val >= 1000) val = (val/1000).toFixed(1) + 'K';
                                      return val;
                                    }
                                    return 'Rs ' +shortenByIndianFormat(d);
                                    //return d3.format(',.2f')(d)
                                },
                                axisLabelDistance: 12,
                                showMaxMin:false
                              },
                      y2Axis: {
                                axisLabel: 'Orders Count',
                                tickFormat: function(d) {
                                  function shortenByIndianFormat(val) {
                                    if(val >= 10000000) 
                                      {val = (val/10000000).toFixed(1) + 'Cr';}
                                    else if(val >= 100000) val = (val/100000).toFixed(1) + 'L';
                                    else if(val >= 1000) val = (val/1000).toFixed(1) + 'K';
                                    return val;
                                  }
                                    return shortenByIndianFormat(d);
                                },
                                showMaxMin:false
                            }

                  }
              };/*options end here*/
              


              
}