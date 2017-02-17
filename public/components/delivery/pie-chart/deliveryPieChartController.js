'use strict';

(function(){

	angular.module('dashboardApp')
		.controller('deliveryPieChartController',pieChartController);

	function pieChartController($scope){

		var vm = this;

        var data = $scope.graphdata;

        var count = 0;

        for(var i =0 ;i < data.length ;i++){
            count = count + data[i].count;
        }


        var colorMapping =  {
            'nomnom' : '#40c381',   // green
            'delivery' : '#FAAF64', // orange
            'fquick'  : '#eb3766',    // pink
            'roadrunnr' : '#65c6bb', // blue
            'shadowfax' : '#89A3C3',  // dark blue
            'fastox' : '#EBD600',     // yellowish-chrome
            'pickingo' : '#FE000F',   // dark red
            'coldex' : '#00FFBD',    // flourescent greenish-blue
            'grab' : '#B46B6B', // light brown
            'loginext' : '#044300',  // dark green
            'nowbike' : '#7E2DB2'    // purple
         }

		vm.optionsPieChart = {
            chart: {
                color : function(d,i){
                    return colorMapping[d._id.toLowerCase()];
                },
                type: 'pieChart',    // essentially a pie chart
                height:320, 
                donut: true,
                margin:{
                    top:0,
                    bottom:0,
                    right:0,
                    left:0
                },    
                x: function(d){return d.service;},
                y: function(d){
                    return d.count;},
                showLabels: true,   // shows labels 
                donutRatio : 0.40,  // width, smaller the value, thicker the donut
                pie: {
                    startAngle: function(d){return d.startAngle/1 -Math.PI/1},
                    endAngle: function(d){return d.endAngle/1 -Math.PI/1}
                },
                labelsOutside : true,  // shows labels outside of the dount 
                duration: 500,  // durations of animations in millisecond
                labelType: function(d){
                    var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
                    return d3.format('%')(percent);
                },
                legendPosition : 'top',
                legend:{
                    margin:{
                        left:0,
                        top:5,
                        right :5,
                        bottom : 0
                    }
                },
                showLegend : true, // to disable the legends
                title : count
                
            },
            caption : {
                    enable : true ,
                    text : "TOTAL DELIVERIES",
                    class : "h2",
                    css : {
                        verticalAlign:"middle",
                        fontSize : "22px",
                        marginBottom : "5px",
                        color : "black"
                    }
                }
        };
    }
})();