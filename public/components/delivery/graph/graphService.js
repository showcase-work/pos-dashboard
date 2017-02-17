'use strict';

angular.module('dashboardApp')
	.factory('graphService', graphService);

function graphService(dateLocationService,Auth,$http) {
	var service = {};

	service.orderDetails = {};

	var authDetails = Auth.getCurrentUser()

	var cloud_site_id = authDetails.cloud_site_id;

	service.filterData = { 
			date :	{
            "from" : new Date(1451606400).getTime(),
            "to" :new Date().getTime()
        	}
        }

	service.current;

	service.graphData = function(queryParam){
		return $http({url : 'api/deliveryGraph',
                  method : 'POST',
                  params :{cloud_site_id : cloud_site_id,type : queryParam},
                  data : service.filterData
            });
	}

	service.setFilterData = function(data){
        service.filterData.date = {
            "from" : new Date(data.date.startDate).getTime(),
            "to" :new Date(data.date.endDate).getTime()
        }
        service.filterData.locationId = data.location;
        if(service.filterData.locationId[0] == 'All' || service.filterData.locationId.length == 0)
            delete service.filterData.locationId;
	}

	service.getFilterData = function(){
		return service.filterData;
	}

	service.setCurrent = function(param){
		service.current = apikey[param];
	}



	service.isMonth = function(){
		if((service.filterData.date.to - service.filterData.date.from)< 1000*60*60*24*31 ){
			return true;
		}
		return false;
	}
	return service;
}