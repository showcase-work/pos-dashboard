angular.module('dashboardApp')
.controller('PieChartController', PieChartController)

function PieChartController() {
    var vm = this;
    //var colors = ["red", "green", "blue", "black"];
    vm.shortenByIndianFormat = shortenByIndianFormat;

    function shortenByIndianFormat(val) {
      if(val >= 10000000) 
        {val = (val/10000000).toFixed(0) + 'Cr';}
      else if(val >= 100000) val = (val/100000).toFixed(0) + 'L';
      else if(val >= 1000) val = (val/1000).toFixed(0) + 'K';
      return val;
    }

    vm.options = {
                chart: {
                    type: 'pieChart',
                    donut: true,
                    margin:{
                      top:0,
                      bottom:0,
                      right:-20,
                      left:5,
                    },
                    
                    donutRatio: 0.35,
                    //color:['#C620D2','#528BE8','#45B29D'],
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,
                    labelsOutside: true,
                    pie: {
                        startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
                        endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
                    },
                    duration: 500,
                    showLegend:true,
                      legendPosition: 'right',
                      legend:{
                        margin:{
                              right:20,
                              top:20,
                              left:10
                        }
                        
                      },
                    labelType: function(d){
                          var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
                          return d3.format('%')(percent);
                        },
                    valueFormat: function(d) {
                                  return d3.format(',.f')(d);
                            }
                }
            };

    vm.options2 = {
                chart: {
                    type: 'pieChart',
                    donut: true,
                    margin:{
                      top:0,
                      bottom:0,
                      right:-20,
                      left:5,
                    },
                    
                    donutRatio: 0.35,
                    //color:['#C620D2','#528BE8','#45B29D'],
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,
                    labelsOutside: true,
                    pie: {
                        startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
                        endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
                    },
                    duration: 500,
                    showLegend:true,
                      legendPosition: 'right',
                      legend:{
                        margin:{
                              right:20,
                              top:20,
                              left:10
                        }
                        
                      },
                    labelType: function(d){
                          var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
                          return d3.format('%')(percent);
                        },
                    valueFormat: function(d) {
                                  return "Rs "+d3.format(',.2f')(d);
                            }
                }
            };
}