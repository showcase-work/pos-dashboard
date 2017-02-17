'use strict';

angular.module('dashboardApp')
  .controller('dateLocationBarController', dateLocationBarController);

function dateLocationBarController($http, Auth, $rootScope, dateLocationService, $scope) {

      var vm = this;
      
      vm.selectedLocations = dateLocationService.filters.location;
      vm.disabled = dateLocationService.disabled;
      $scope.status={isopen:false};
      vm.refresh = refresh;


      function refresh(){
        $rootScope.$broadcast( 'refresh.initiated' );
      }

      updateLocations();

      vm.handleLocationFilterBoxClose = function(open) {
        if(open) {
        }
        else
        {
          console.log("closed");
          angular.forEach(vm.locations, function(city) {
            city.opened=false;
          })
        }

      }

      vm.dateRange = { 
        "Today": [
            moment().utc().startOf('day'),
            moment().utc().endOf('day')
        ],
        "Yesterday": [
            moment().utc().subtract(1,'days').startOf('day'),
            moment().utc().subtract(1,'days').endOf('day')
        ],
        "Last 7 Days": [
            moment().utc().subtract(7,'days').startOf('day'),
            moment().utc().endOf('day')
        ],
        "Last 30 Days": [
            moment().utc().subtract(30,'days').startOf('day'),
            moment().utc().endOf('day')
        ],
        "This Month": [
            moment().utc().startOf('month'),
            moment().utc().endOf('month')
        ],
        "This Week": [
            moment().utc().startOf('week'),
            moment().utc().endOf('week')
        ],
        "Last Month": [
            moment().utc().subtract(1,'months').startOf('month'),
            moment().utc().subtract(1,'months').endOf('month')
        ]};

      $scope.myDateRange = dateLocationService.filters.date;

      $scope.$watch(function () { return dateLocationService.disabled }, function (newVal, oldVal) {
        vm.disabled = newVal;
      });

      function updateLocations(){
        vm.locationsLoading = true;
        dateLocationService.getLocations().then(function(data){
          vm.locations = data.data.outlets;
          vm.locationsLoading = false;
        });
      }
      

      vm.toggleOutlets = function(city) {
        if(city.opened == false || city.opened == undefined)
        {
          city.opened=true;
        }
        else
        {
          city.opened=false;
        }
      }

      vm.selectAllOutletsForCity = function(city) {
        city.checked = 'all';
        if(vm.selectedLocations == 'All') {
          vm.selectedLocations = [];
        }

        angular.forEach(city.locations, function(outlet){
          var index = vm.selectedLocations.indexOf(outlet.location_id)
          if(index <= -1)
          {
            vm.selectedLocations.push(outlet.location_id);
          }
        })
      }

      vm.deselectAllOutletsForCity = function(city) {
        city.checked = 'none';

        angular.forEach(city.locations, function(outlet){
          var index = vm.selectedLocations.indexOf(outlet.location_id)
          if (index > -1) {
              vm.selectedLocations.splice(index, 1);
          }
        })
      }

      vm.handleOutletClick = function(outlet, city) {

        if(vm.selectedLocations[0]=="All"){
          vm.selectedLocations = [];
        }

        var index = vm.selectedLocations.indexOf(outlet.location_id)
        if (index > -1) {
            vm.selectedLocations.splice(index, 1);
        }
        else
        {
          vm.selectedLocations.push(outlet.location_id);
        }

        var selected = false;
        var notselected = false;

        angular.forEach(city.locations, function(outlet){
          var index = vm.selectedLocations.indexOf(outlet.location_id)
          if (index > -1) {
              selected = true;
          }
          else
          {
            notselected = true;
          }
        })

        if(selected && notselected) {
          city.checked = 'some';
        }
        if(!selected && notselected) {
          city.checked = 'none';
        }
        if(selected && !notselected) {
          city.checked = 'all';
        }

      }

      vm.applyChanges = function(all) {
        $scope.status.isopen = false;
        if(vm.selectedLocations == '' || all)
        {
          if(vm.selectedLocations[0] == 'All'){
          }
          else
          {
            vm.selectedLocations = ['All']
            dateLocationService.changeLocation(vm.selectedLocations); 
          }
          angular.forEach(vm.locations, function(location){
            location.checked = 'none';
          })
        }
        else
        {
          dateLocationService.changeLocation(vm.selectedLocations); 
        }
                
      }

      vm.changeDate = function(newDate){
        console.log("changing date");
          dateLocationService.changeDate(newDate)
      }


      /*-------------------*/

}