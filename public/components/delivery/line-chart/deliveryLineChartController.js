'use strict';

(function(){

	angular.module('dashboardApp')
		.controller('deliveryLineChartController',lineChartController);

	function lineChartController(graphService){

		var vm = this;

        vm.current = graphService.current

        function updateLabel(){
            if(vm.current!=224)
                vm.yAxis = "Time (mins)"
            else
                vm.yAxis = "Deliveries";
        }
        updateLabel();

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

		vm.optionsLineChart = {
            chart: {
                type: 'lineChart',
                height: 300,
                margin : {
                    top: 25,
                    right: 20,
                    bottom: 60,
                    left: 80
                },
                color : function(d){
                    return colorMapping[d.key.toLowerCase()]
                },
                x: function(d){ 
                    return Date.parse(d.time); },
                    y: function(d){
                        if(!(vm.current == 224)){
                          var val = d.value/(1000*60);
                          return val;
                      }
                      else{
                       return d.value; 
                   }
               },
               useInteractiveGuideline: false,
                xAxis: {
                    tickValues : function(d){
                        var max = 0;
                        var index = 0;
                        for(var i = 0; i < d.length ;i++){
                            if(max < d[i].values.length)
                                index = i;
                                max = d[i].values.length
                        }
                        var input = d[index].values;
                        var res = [];
                        for(var i =0;i<input.length;i++){
                            res.push(Date.parse(input[i].time));
                            // console.log(arr[i].x);
                        }
                        return res;
                    },
                    tickFormat : function(d){
                        if(graphService.isMonth()){
                            var format = d3.time.format('%d %b');
                            return format(new Date(d));
                        }
                        var format = d3.time.format("%b '%y");
                        return format(new Date(d));
                                    // return d;    
                    },
                    rotateLabels : -45,
                    showMaxMin : false,
                                // forceX : [0]
                },
                yAxis: {
                    axisLabelDistance : 5,
                    axisLabel : vm.yAxis,
                    tickFormat: function(d){
                        if( d >= 0)
                            return d3.format('.02f')(d);
                        return ;
                    },
                    axisLabelDistance: 10
                },
                lines : {
                    forceY : [0,null]
                }
            },
            
            showLegend : true,
            legend: {
                width: 400,
                height: 20,
                align: true,
                maxKeyLength: 20,
                rightAlign: true,
                padding: 32,
                updateState: true,
                radioButtonMode: false,
                expanded: false,
                vers: "classic",
                margin: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 50
                }
            },
        };
    }
})();