'use strict';

(function(){
	angular.module('dashboardApp')
		.controller('graphController', graphController);

	function graphController(dateLocationService,graphService,$scope,$stateParams){

		var vm = this;
		vm.current = $stateParams.id;
		graphService.current = vm.current;
		vm.isLoading = true;
		vm.hasError = false;
		vm.dataLineChart = [];
		vm.dataBarGraph = [];

		vm.optionsBarGraph = graphService.optionsBarGraph;
		vm.optionsLineChart = graphService.optionsLineChart;

		vm.constants = {
			'208' : "Delivery Time",
			'224' : "Rejected Deliveries",
			'203' : "Response Time",
			'205' : "Pickup Time"
		};

		vm.colorConstants = {
			'208' :  "blue",
			'224' :  "pink",
			'203' :  "green",
			'205' : 'orange'
		}

		function updateGraph(current){
			graphService.graphData(current)
			.then( function(graphdata){
				vm.isLoading = false;
				vm.hasError = false;
				vm.dataBarGraph = [];
				vm.dataLineChart = [];
				vm.dataBarGraph.push({
					values : graphdata.data.partnerDistribution,
					key : vm.constants[vm.current]
				});
				var lineChartData = graphdata.data.timeWiseDistribution;
				for(var i = 0; i <lineChartData.length ; i++ ){
					vm.dataLineChart.push({
						values : lineChartData[i].deliveries,
						key : lineChartData[i]._id
					});

				}
			})
			.catch(function(response, status){
				vm.isLoading = false;
				vm.hasError = true;
			});
		}

		$scope.$on('date.changed', function(event){
			vm.isLoading = true;
			graphService.setFilterData(dateLocationService.filters)
			updateGraph(vm.current);
		});

		$scope.$on('location.changed', function(event){
			vm.isLoading = true;
			graphService.setFilterData(dateLocationService.filters);
			updateGraph(vm.current);
		});

		$scope.$on('refresh.initiated', function(event){
			vm.isLoading = true;
			updateGraph(vm.current);
		});

		graphService.setFilterData(dateLocationService.filters);
		updateGraph(vm.current);

	}

})();