'use strict';

(function(){
	angular.module('dashboardApp')
	.controller('orderController', orderController);

	function orderController($scope, $http, orderService,dateLocationService,Auth,$uibModal) {
	 	var vm = this;
	 	vm.isLoading = true;
	 	vm.hasError = false;
	 	vm.validation = true;
	 	vm.orders = [];
	 	vm.page  = 1;
		vm.maxSize = 10;
		vm.totalOrders = 100;
		vm.filterOpen = false;
		vm.currentRow = -1;

	 	vm.getStatus = getStatus;
	 	vm.pageChanged = pageChanged;
	 	vm.toggleFilters = toggleFilters;
	 	vm.partnerCheckBox = partnerCheckBox;
	 	vm.statusCheckBox = statusCheckBox;
	 	vm.setFilterData = setFilterData;
	 	vm.removeFilters = removeFilters;
	 	vm.removeFilterElements = removeFilterElements;
	 	vm.openModal = openModal;
	 	vm.setCurrentRow = setCurrentRow;
	 	vm.getConfig = getConfig;
	 	vm.findPartnerName = findPartnerName;
	 	vm.checked = checked;
	 	vm.filters = {
	 		'orderId' : '',
	 		'partners' : [],
	 		'status' : [],
	 		'turnaroundTimeDiff' : {from :'', to :  ''},
	 		'pickupTimeDiff' : {from : '', to : ''},
	 		'deliveryTimeDiff' : {from : '',to : ''}
	 		// 'cost' : {from : 0, to : 0},
	 		// 'distance' : {'from':0,to: 0}
	 	};

	 	vm.filterShow = {
	 		'orderId' : '',
	 		'partners' : [],
	 		'status' : [],
	 		'turnaroundTimeDiff' : "",
	 		'pickupTimeDiff' : "",
	 		'deliveryTimeDiff' : ""
	 		// 'cost' : {from : '', to : ''},
	 		// 'distance' : {'from':'',to: ''}
	 	};

	 	vm.dropdown = {
			'orderId' : '',
			'status' : '',
			'partners' : '',
			'turnaroundTimeDiff' : '',
			'deliveryTimeDiff' : '',
			'pickupTimeDiff' : ''
			}

	 	vm.responseTimeSlider = {
	 		options : {
	 			floor: 0,
        		ceil: 100,
        		step: 1,
        		noSwitching : true
	 		}
	 	}

	 	vm.deliveryTimeSlider = {
	 		options : {
	 			floor: 0,
        		ceil: 300,
        		step: 3,
        		noSwitching : true
	 		}
	 	}

	 	function updateOrders(){
	 		vm.currentRow = -1;
			orderService.getOrders()
				.then(function(result){
					vm.isLoading = false;
					vm.hasError = false;
					if(result.data.count > 0){
						vm.orders = result.data.delivery;
					}
					else{
						vm.orders = [];	
					}
					vm.totalOrders = result.data.count;

				})
				.catch( function(response,status){
					vm.isLoading = false;
					vm.hasError = true;
				});
	 	}
	 	function pageChanged(){
	 		vm.isLoading = true;
	 		orderService.setFilterData('pageNumber',vm.page);
	 		updateOrders();
	 	}

	 	function partnerCheckBox(partnerId){
	 		vm.filters.partners = orderService.checkBox(vm.filters.partners,partnerId);
	 	}
	 	function statusCheckBox(statusCode){
	 		vm.filters.status = orderService.checkBox(vm.filters.status,statusCode);
	 	}

 		vm.statusKey = {
 			'200' : 'PENDING',
 			'201' : 'DELIVERY REQUESTED',
 			'202' : 'PROCESSING ORDER',
 			'203' : 'ALLOCATED RIDER',
 			'204' : 'OUT OF HUB',
 			'205' : 'RIDER AT OUTLET',
 			'206' : 'WAITING FOR DISPATCH',
 			'207' : 'OUT FOR DELIVERY',
 			'208' : 'ORDER DELIVERED',
 			'209' : 'ORDER CANCELLED',
 			'210' : 'REACHED CUSTOMER',
 			'221' : 'ORDER DECLINED',
 			'222' : 'ORDER NOT DELIVERED',
 			'223' : 'ORDER RETURNED',
 			'224' : 'ORDER REJECTED',
 			'225' : 'UNABLE TO PROCESS',
 			'226' : 'UNABLE TO REQUEST',
 			'227' : 'RIDER UNAVAILABLE'	
 		}



	 	function getStatus(statusCode){
	 		return vm.statusKey[statusCode];
	 	}

	 	function checked(key, value){
	 		return orderService.ifExists(vm.filters[key],value)
	 	}


	 	function toggleFilters(){
	 		vm.filterOpen = !vm.filterOpen;
	 		if(!vm.filterOpen){
	 			vm.isLoading = true;
	 			for(var key in vm.filterShow){
	 				orderService.removeFilters(key);
	 				vm.filterShow[key] = ''
	 			}

	 		getDate();
	 		}
	 	}

	 	function setFilterData(key){
	 		vm.page = 1;
	 		orderService.setFilterData('pageNumber',vm.page);
	 		orderService.setFilterData(key,vm.filters[key]);
		 	// vm.filterShow = Object.create(vm.filters)
		 	vm.filterShow[key] = angular.copy(vm.filters[key]);
	 		vm.dropdown[key] = false;
	 		vm.isLoading = true;
	 		vm.hasError = false;
	 		updateOrders();
	 	}

	 	function removeFilters(key){
	 		vm.page = 1;
	 		orderService.setFilterData('pageNumber',vm.page);
	 		orderService.removeFilters(key);
	 		vm.filterShow[key] = '';
	 		vm.isLoading = true;
	 		updateOrders();
	 	}

	 	function removeFilterElements(key,value){
	 		vm.page = 1;
	 		orderService.setFilterData('pageNumber',vm.page);
	 		orderService.checkBox(vm.filters[key],value);
	 		vm.filterShow[key] = angular.copy(vm.filters[key])
	 		if(vm.filters[key].length == 0)
	 			orderService.removeFilters(key);
	 		vm.isLoading = true;
	 		orderService.setFilterData(key,vm.filters[key]);
	 		updateOrders();
	 	}

	 	function getDate(){
	 		vm.filters.date = {
	 			"from" : new Date(dateLocationService.filters.date.startDate).getTime(),
	 			"to" :new Date(dateLocationService.filters.date.endDate).getTime()
	 		}
	 		setFilterData('date');
	 	};
	 	function getLocations(){
	 		vm.filters.locationId = dateLocationService.filters.location;
	 		if(vm.filters.locationId[0] == 'All' || vm.filters.locationId.length == 0)
	 			delete vm.filters.locationId;
	 		else
	 			setFilterData('locationId');
	 	};



        function openModal(order_details){
			orderService.setOrderDetails(order_details);
			var modalInstance = $uibModal.open({
      			animation: true,
      			controller : "raiseIssueController",
      			controllerAs : "issue",
      			templateUrl: 'app/delivery/views/order/issueModal.html',
      			size : "md"
			});
		}

		function setCurrentRow(logisticId){
			if(vm.currentRow == logisticId)
				vm.currentRow = -1;
			else
				vm.currentRow = logisticId;
		}

		function getConfig(){
			orderService.getConfig()
				.then(function(partnerdata){
					vm.partners = partnerdata.data.data;
				})
				.catch(function(err,response){
					console.log(err);
				});
			}

		function findPartnerName(partnerId){
			for(var i= 0 ;i < vm.partners.length ;i++){
				if(vm.partners[i].id == partnerId)
					return vm.partners[i].name;
			}
			return "NO PARTNER";
		}

	 	$scope.$on('date.changed', function(event){
	 		getDate();
	 	});

	 	$scope.$on('location.changed', function(event){
	 		getLocations();
	 	});

	 	$scope.$on('refresh.initiated', function(event){
			vm.isLoading = true;
			updateOrders();
		});

	 	getDate();
	 	getConfig();


	}
})();