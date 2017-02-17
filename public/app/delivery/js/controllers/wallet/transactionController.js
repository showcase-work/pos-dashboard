'use strict';
(function(){
	
	angular.module('dashboardApp')
		.controller('transactionController',transactionController);

	function transactionController(walletService,$uibModalInstance){
		var vm = this;
		vm.closeModal = function(){
			 $uibModalInstance.dismiss('cancel');
		}
		vm.walletDetails = walletService.walletDetails;
		vm.page  = 1;
		vm.maxSize = 10;
		vm.transactionsLoading = true;
		vm.subscriptionsLoading = true;
		vm.transactionError = false;
		vm.subscriptionError = false;

		vm.getWalletSubscriptions = getWalletSubscriptions;
		vm.getWalletTransactions = getWalletTransactions;
		vm.getTransactionsCount = getTransactionsCount;
		vm.pageChanged = pageChanged;

		function getWalletSubscriptions(walletID){
			walletService.getWalletSubscriptions(walletID)
			.success(function(data){
				vm.subscriptions = data.wallets;
				vm.subscriptionsLoading = false;
			})
			.error(function(response, status){
				vm.transactionsLoading = false;
				vm.subscriptionsError = true;
			});
		}

		function getWalletTransactions(walletID,page){
			walletService.getWalletTransactions(walletID,page)
			.success(function(data){
				vm.transactions = data.wallets;
				vm.transactionsLoading = false;
			})
			.error(function(response, status){
				vm.transactionsLoading = false;
				vm.transactionsError = true;
			});
		}

		function getTransactionsCount(walletID){
			walletService.getTransactionsCount(walletID)
			.success(function(data){
				vm.totalTransactions = data.wallets;
			});
		}

		function pageChanged(){
			vm.transactionsLoading = true;
			vm.getWalletTransactions(vm.walletDetails.id,vm.page);

		}

		vm.getWalletSubscriptions(vm.walletDetails.id);
		vm.getTransactionsCount(vm.walletDetails.id);
	}

})();