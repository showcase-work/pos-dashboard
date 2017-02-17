'use strict';

angular.module('dashboardApp')
	.factory('orderService',orderService);


function orderService($http,dateLocationService,Auth){
	var service = {};

	service.orderDetails ={};

	var authDetails = Auth.getCurrentUser();

	var cloud_site_id = authDetails.cloud_site_id;

	service.filterData = {
		    "pageSize" : 10,
		    "pageNumber" : 1,
		    "cloudSiteId": +cloud_site_id
		   }

	service.getOrders = function(){
		return $http({
			url : "/api/deliveryOrder",
			method : "POST",
			json : true,
			data : service.filterData
		});
	}

	service.checkBox = function(arr, id){
		var index = arr.indexOf(id);
		if(index < 0){
			arr.push(id);
		}
		else{
			arr.splice(index,1);
		}
		return arr;
	}

	service.setFilterData = function(key,value){
		service.filterData[key] = value;
	}

	service.removeFilters = function(key){
		delete service.filterData[key];
	}

	service.getFilterData = function(){
		return service.filterData;
	}

	service.setOrderDetails = function(orderDetails){
		service.orderDetails = orderDetails;
	}

	service.raiseIssue = function(body){
		return $http({
			url : "/api/deliveryOrder/email", // to be decided,
			method : "POST",
			json : true,
			data : body
		});
	}

	service.getConfig = function(){
		return $http({
			"url" : "/api/deliveryOrder/config",
			method : "GET",
			params : {cloud_site_id : 32}
		});
	}

	service.ifExists = function(arr,id){
		if(arr.indexOf(id) == -1)
			return false;
		return true
	}

	return service;
}