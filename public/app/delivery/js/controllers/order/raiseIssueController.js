'use strict';

(function(){
	
	angular.module('dashboardApp')
		.controller('raiseIssueController',raiseIssueController);

	function raiseIssueController(orderService,$uibModalInstance){
		var vm = this;
		vm.closeModal = function(){
			 $uibModalInstance.dismiss('cancel');
		}
		vm.form = {
			name : "",
			email : "",
			description : ""
		}
		vm.details = (orderService.orderDetails);
		vm.submitForm = submitForm;
		vm.form.details = JSON.stringify(vm.details);
		vm.form.logisticId = orderService.orderDetails.logisticId.toString();

		function submitForm(){
			vm.isLoading = true;
			vm.hasError = false;
			orderService.raiseIssue(vm.form)
				.then(function(result){
					vm.isLoading = false;
					vm.hasError = false;
					vm.success = true;
					vm.refNo = result.refNo;
					vm.form = {};
				})
				.catch(function (error, status){
					vm.isLoading = false;
					vm.hasError = true;
				});
		}

	}

})();