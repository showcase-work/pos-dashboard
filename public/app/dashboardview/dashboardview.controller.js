'use strict';
(function(){

angular.module('dashboardApp')
  .component('dashboardview', {
    templateUrl: 'app/dashboardview/dashboardview.html',
    controller: DashboardviewComponent,
    controllerAs: 'DashboardviewComponent'
  });

function DashboardviewComponent($scope, $http, Auth, Orders, GraphPiechartData,dateLocationService, ngToast) {
        
        var vm = this;
        /*ngToast.create({
          className: 'warning',
          content: '<a href="#" class="">a message</a>',
          timeout:100000
        });*/

        vm.orders = Orders.orders;
        vm.date_selected = Orders.filters.date_type;
        vm.toggleButton = toggleButtonFunction;
        vm.getPaymentMode = getPaymentModeFunction;
        vm.getWidth = getWidth;
        vm.getShortIndianFormatForMoney = getShortIndianFormatForMoney;
        vm.toggle = Orders.toggle;

        vm.date_type_list = dateLocationService.date_type_list;


        if(Orders.orders == "") {
              updateOrders();
        }
        else
        {
          updateValues(Orders.orders);
        }

        /*---------------------------changing filters---------------------------*/
        /*on change of filters update orders*/
        $scope.$on( 'location.changed', function() {
            updateOrders();
        });

        $scope.$on( 'date.changed', function() {
            updateOrders();
        });
        /*changing date-type filter on the graph*/
        vm.changeDateType = changeDateType;

        $scope.$on( 'refresh.initiated', function() {
            updateOrders();
        });
        /*-------------------------------------------------------------------------*/

        function changeDateType(date_selected){
            Orders.filters.date_type = date_selected;
            vm.date_selected = date_selected;
            updateGraphOrders();
        }

        vm.showHoverBox = function(source, type) {
          if(type == "Revenue"){
            source.showHoverCardRevenue = true;
          }
          if(type == "Orders"){
            source.showHoverCardOrders = true;
          }
          if(type == "averageBasketSize"){
            source.showHoverCardaverageBasketSize = true;
          }

        }

        vm.hideHoverBox = function(source, type) {
          if(type == "Revenue"){
            source.showHoverCardRevenue = false;
          }
          if(type == "Orders"){
            source.showHoverCardOrders = false;
          }
          if(type == "averageBasketSize"){
            source.showHoverCardaverageBasketSize = false;
          }
        }

        function getShortIndianFormatForMoney(val) {
              if(val >= 10000000) 
                {val = (val/10000000).toFixed(2) + ' Cr';}
              else if(val >= 100000) val = (val/100000).toFixed(2) + ' Lac';
              else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';
              return val;
        }


        /*toggle button on revenue and orders*/
        function toggleButtonFunction(type){
          if(vm.toggle[type].selected == "mode"){
            vm.toggle[type].margin = -41;
            vm.toggle[type].selected = "source";
          }
          else
          {
            vm.toggle[type].margin = 0;
            vm.toggle[type].selected = "mode";
          }

          Orders.toggle = vm.toggle;
        }


        function getPaymentModeFunction(payment_mode_id) {
          switch(payment_mode_id) {

                case 0:
                   var payment_mode = "Others";
                   break;
                case 1:
                   var payment_mode = "Paytm";
                   break;
                case 2:
                   var payment_mode = "Cash";
                   break;
                case 3:
                   var payment_mode = "Mobikwik";
                   break;
                case 4:
                   var payment_mode = "Citrus";
                   break;
                case 5:
                   var payment_mode = "Sodexo";
                   break;
                case 6:
                   var payment_mode = "Card";
                   break;
                case 7:
                   var payment_mode = "Unsettled";
                   break;
                case 8:
                   var payment_mode = "Ola Money";
                   break;
                case 9:
                   var payment_mode = "Freecharge";
                   break;
                case 10:
                   var payment_mode = "RazorPay";
                   break;
                case 11:
                   var payment_mode = "Online";
                   break;
             }
             return payment_mode;
        }

        function updateGraphOrders(){
          vm.updatingGraph = true;
          Orders.updateGraphOrders().then(function(data){
            console.log(data);
            dateLocationService.disabled = false;
            updateGraphValues(data);
            vm.updatingGraph = false;
           })/*.error(function(err){
            console.log("wjekrjdsfnadfs");
            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });*/
        }

        function updateOrders(){
            Orders.orders = "";
            vm.orders = "";
            dateLocationService.disabled = true;

            var date_from = new Date(dateLocationService.filters.date.startDate);
            var date_to = new Date(dateLocationService.filters.date.endDate);

            var timeDiff = Math.abs(date_to.getTime() - date_from.getTime()); 
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if(diffDays <=1){
              vm.date_type_list = ["Hour"];
            }
            if(diffDays >1 && diffDays <=31){
              vm.date_type_list = ["Day", "Week"];
            }
            if(diffDays >31 && diffDays<=62){
              vm.date_type_list = ["Day","Week","Month"];
            }
            if(diffDays >62 && diffDays <=365){
              vm.date_type_list = ["Month","Year"];
            }
            if(diffDays >365){
              vm.date_type_list = ["Year"];
            }

            dateLocationService.date_type_list = vm.date_type_list;

            if(vm.date_type_list.indexOf(vm.date_selected)<=-1){
              Orders.filters.date_type = vm.date_type_list[0];
              vm.date_selected = vm.date_type_list[0];
            }
            

            Orders.updateOrders().then(function(data){
              dateLocationService.disabled = false;
              updateValues(data);
             })/*.error(function(err){

            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });;*/
        }

        function getWidth(highestValue, value) {
          var val = (value/highestValue)*100;
          return val
        }

        function updateGraphValues(data){
          vm.orders_by_date = data.orders_by_date;
          vm.graph = GraphPiechartData.updateGraphData(vm.orders_by_date, vm.date_selected);
          vm.total_orders = vm.graph.totalOrders;
          vm.total_revenue = vm.graph.totalRevenue;
        }

        function updateValues(data){
            vm.orders = data;
            Orders.orders = data; /*set orders service to current data so that when you change tabs it is not fetched again*/

            /*setting all required scope parameters*/
            vm.total_orders = 0;
            vm.total_revenue = 0;

            vm.orders_by_date = vm.orders.orders_by_date;
            vm.orders_by_payment_mode = vm.orders.orders_by_payment_mode;
            vm.orders_by_sources = vm.orders.orders_by_sources;
            vm.orders_by_type = vm.orders.orders_by_type;
            vm.orders_by_status = vm.orders.orders_by_status;
            vm.orders_by_completion_status = vm.orders.orders_by_completion_status;
            vm.orders_by_lost_business = vm.orders.orders_by_lost_business;
            vm.orders_by_users_old_new = vm.orders.orders_by_users_old_new;
            /*--*/
            /*setting params for the graphs and pie charts*/
            setGraphAndTotalsParameters();
            setPieChartParameters();
            /*--*/
            
            function setGraphAndTotalsParameters(){
                vm.graph = GraphPiechartData.updateGraphData(vm.orders_by_date, vm.date_selected);
                vm.total_orders = vm.graph.totalOrders;
                vm.total_revenue = vm.graph.totalRevenue;
            }

            function setPieChartParameters(){
                vm.pieChartGraph = GraphPiechartData.updatePieChartData(vm.orders_by_type,vm.orders_by_status,vm.orders_by_users_old_new);
            }
            
        }/*function update values ends*/
      /*-----*/
}

})();
