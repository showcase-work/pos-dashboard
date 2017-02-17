'use strict';

angular.module('dashboardApp')
	.service('walletService', walletService);

	function walletService($http,$q,Auth) {
			var service = {};
			service.walletID;
			service.getWalletDetails = function(cloud_site_id){
				return $http({url:'/api/wallet',
								method:'GET',
								params:{ cloud_site_id:cloud_site_id }
						 });
			}

			service.setWalletDetails = function(wallet){
				service.walletDetails = wallet;
			}

			service.getWalletSubscriptions = function(walletID){
				return $http({url : 'api/walletSubscriptions',
											method : 'GET',
											params :{walletID : walletID}
										});
			} 

			service.getWalletTransactions = function(walletID,page) {
				return $http({url : 'api/walletTransactions',
											method : 'GET',
											params:{walletID : walletID,page : page}
										});
			}

			service.getTransactionsCount = function(walletID) {
				return $http({
											url : "api/walletTransactions/transactionCount",
											method : "GET",
											params :{walletID : walletID}
										});
			}

			return service;
	}