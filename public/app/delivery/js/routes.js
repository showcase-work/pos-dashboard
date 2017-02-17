'use strict';

angular.module('dashboardApp')
	.config(router);

function router($stateProvider, $urlRouterProvider){

$stateProvider
	.state('dashboard.delivery',{
		url : '',
		abstract : true,
		templateUrl : "app/delivery/views/main.html"
	})
	.state('dashboard.delivery.home',{
		url : '/home',
		views : {
			'partner' : {
				template : "<div ui-view = 'graph'></div> ",
				abstract : true
			},
			order : {
				templateUrl : "app/delivery/views/order/order.html",
				controller : "orderController",
				controllerAs : "order"
			},
			'walletView' : {
				template: "<div ui-view = 'wallet'></div>",
				abstract : true
			},
			"graph@dashboard.delivery.home" : {
				templateUrl : "app/delivery/views/graphs/home.html",
				controller : "homeController",
				controllerAs : "home"
			},
			"wallet@dashboard.delivery.home" : {
				templateUrl : "app/delivery/views/wallet/allWallets.html",
				controller : "walletController",
				controllerAs : "wallet"
			}
		}
	})
	.state('graph',{
		url : "/graph/:id",
		parent : "dashboard.delivery.home",
		views : {
			"graph@dashboard.delivery.home" : {
				"templateUrl" : "app/delivery/views/graphs/graph.html",
				controller : "graphController",
				controllerAs : "graph"
				}
			}
	})
	.state('transactions',{
		url : "/wallet/:wallet_id",
		parent : "dashboard.delivery.home",
		views : {
			"wallet@dashboard.delivery.home" : {
				"templateUrl" : "app/delivery/views/wallet/transactions.html",
				controller : "wallterController",
				controllerAs : "wallet"
			}

		}
	});
}