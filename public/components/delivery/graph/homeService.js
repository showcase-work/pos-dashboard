'use strict';

angular.module('dashboardApp')
	.factory('homeService', homeService);


function homeService(Auth,$http) {

	var service = {};

	var authDetails = Auth.getCurrentUser();

	var cloud_site_id = authDetails.cloud_site_id;

	service.partners = function(data) {
		return $http({url : '/api/deliveryHome',
	          method : 'POST',
	          params :{cloud_site_id : cloud_site_id},
	          data : data
	    	});
		}

	return service;
}