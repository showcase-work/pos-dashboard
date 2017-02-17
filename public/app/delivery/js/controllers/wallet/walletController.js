'use strict';

(function(){


	angular.module('dashboardApp')
		.controller('walletController',walletController);
			

	function walletController($scope,dateLocationService,walletService,Auth,$uibModal){
		var vm = this;

		vm.wallets = {};
		vm.isLoading = true;
		vm.hasError = false;

		vm.getWalletDetails = getWalletDetails
		vm.status = status;
		vm.openModal = openModal;

		function getWalletDetails(cloud_site_id){
			walletService.getWalletDetails(cloud_site_id)
				.success(function(data){
					vm.isLoading = false;
					vm.wallets = data.wallets;
					vm.hasError = false;
				})
				.error(function(response, status){
					vm.hasError = true;
					vm.isLoading = false;
				});
		}

		var authDetails = Auth.getCurrentUser();

		var cloud_site_id = authDetails.cloud_site_id;

		vm.getWalletDetails(cloud_site_id);

		function status(code){
			if(code == 1)
				return "Active"
			return "Closed";
		}


		$scope.$on('refresh.initiated', function(event){
			vm.isLoading = true;
			getWalletDetails(cloud_site_id);
		})

		function openModal(wallet_details){
	        walletService.setWalletDetails(wallet_details);
	        var modalInstance = $uibModal.open({
	            animation: true,
	            controller : "transactionController",
	            controllerAs : "transaction",
	            templateUrl: 'app/delivery/views/wallet/transactionModal.html',
	            size : "lg"
	        });
	    }
	}


})();

