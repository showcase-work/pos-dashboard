'use strict';

(function(){


    angular.module('dashboardApp')
        .controller('homeController', homeController);


    function homeController($scope,dateLocationService,homeService,graphService){

        var vm = this;

        vm.data = [];
        vm.average = {};
        vm.dataPieChart = [];
        var filterData = {};
        vm.isLoading = true;
        vm.hasError = false;
        vm.optionsPieChart = homeService.optionsPieChart;
        
        var updateData = function(filters){
        homeService.partners(filters)
            .then(function(partnerData){
                vm.data = partnerData.data;
                vm.isLoading = false;
                vm.dataPieChart = vm.data.deliveries;
                vm.average.pickupTime = vm.data.pickupTime;
                vm.average.deliveryTime = vm.data.avgDeliveryTime;
                vm.average.turnAroundTime = vm.data.avgTurnAroundTime;
                vm.average.rejectedPercentage = vm.data.rejectedPercent;
            })
            .catch(function(response, status){
                vm.isLoading = false;
                vm.hasError = true;
            });
        }
            
        
        function getDate(){
            filterData.date = {
                "from" : new Date(dateLocationService.filters.date.startDate).getTime(),
                "to" :new Date(dateLocationService.filters.date.endDate).getTime()
            }
        };
        function getLocations(){
            filterData.locationId = dateLocationService.filters.location;
            if(filterData.locationId[0] == 'All' || filterData.locationId.length == 0)
                delete filterData.locationId;
        };


        $scope.$on('date.changed', function(event){
            vm.isLoading = true;
            getDate();
            updateData(filterData);
        });

        $scope.$on('location.changed', function(event){
            vm.isLoading = true;
            getLocations();
            updateData(filterData);
        });

        $scope.$on('refresh.initiated', function(event){
            vm.isLoading = true;
            updateData(filterData);
        });

        getDate();
        updateData(filterData);

    }
    
})();