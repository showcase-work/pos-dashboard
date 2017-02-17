'use strict';

(function(){

	angular.module('dashboardApp')
		.controller('deliveryBarGraphController',barGraphController);

	function barGraphController(graphService){

		var vm = this;

        vm.current = graphService.current;

        function updateLabel(){
            if(vm.current!=224)
                vm.yAxis = "Time (mins)"
            else
                vm.yAxis = "Deliveries";
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

        updateLabel();
		vm.optionsBarGraph = {
            chart: {
                type: 'discreteBarChart',
                height: 300 ,
                margin : {
                    top: 25,
                    right: 10,
                    bottom: 60,
                    left:70
                },
                color : function(d){
                    return colorMapping[d._id.toLowerCase()]
                },
                x: function(d){return d._id;},
                y: function(d){
                    if(!(vm.current == 224)){
                        var val = d.value/(1000*60);
                        return val;
                    }
                    else{
                        return d.value; 
                    }
                },
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.2f')(d);
                },
                duration: 500,
                xAxis: {
                    rotateLabels : -45
                },
                yAxis: {
                    axisLabel : vm.yAxis,
                    axisLabelDistance: 5
                },
                refreshDataOnly : true,
                deepWatchData : true,
                deepWatchDataDepth : 2
            }
        };
    }
})();