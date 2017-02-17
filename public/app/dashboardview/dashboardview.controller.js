'use strict';
(function(){

angular.module('dashboardApp')
  .component('dashboardview', {
    templateUrl: 'app/dashboardview/dashboardview.html',
    controller: DashboardviewComponent,
    controllerAs: 'DashboardviewComponent'
  });

function DashboardviewComponent($scope, $http, Auth, Orders, GraphPiechartData,dateLocationService, ngToast) {
        
        var self = this;
        /*ngToast.create({
          className: 'warning',
          content: '<a href="#" class="">a message</a>',
          timeout:100000
        });*/

        self.orders = Orders.orders;
        self.date_selected = Orders.filters.date_type;
        self.toggleButton = toggleButtonFunction;
        self.getPaymentMode = getPaymentModeFunction;
        self.getWidth = getWidth;
        self.getShortIndianFormatForMoney = getShortIndianFormatForMoney;
        self.toggle = Orders.toggle;

        self.date_type_list = dateLocationService.date_type_list;
        self.loaded = false;


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
        self.changeDateType = changeDateType;

        $scope.$on( 'refresh.initiated', function() {
            updateOrders();
        });
        /*-------------------------------------------------------------------------*/

        function changeDateType(date_selected){
            Orders.filters.date_type = date_selected;
            self.date_selected = date_selected;
            updateGraphOrders();
        }

        self.showHoverBox = function(source, type) {
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

        self.hideHoverBox = function(source, type) {
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
          if(self.toggle[type].selected == "mode"){
            self.toggle[type].margin = -41;
            self.toggle[type].selected = "source";
          }
          else
          {
            self.toggle[type].margin = 0;
            self.toggle[type].selected = "mode";
          }

          Orders.toggle = self.toggle;
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
          self.updatingGraph = true;
          Orders.updateGraphOrders().then(function(data){
            console.log(data);
            dateLocationService.disabled = false;
            updateGraphValues(data);
            self.updatingGraph = false;
           })/*.error(function(err){
            console.log("wjekrjdsfnadfs");
            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });*/
        }

        function updateOrders(){
            self.loaded = false;
            Orders.orders = "";
            self.orders = "";
            dateLocationService.disabled = true;

            var date_from = new Date(dateLocationService.filters.date.startDate);
            var date_to = new Date(dateLocationService.filters.date.endDate);

            var timeDiff = Math.abs(date_to.getTime() - date_from.getTime()); 
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if(diffDays <=1){
              self.date_type_list = ["Hour"];
            }
            if(diffDays >1 && diffDays <=31){
              self.date_type_list = ["Day", "Week"];
            }
            if(diffDays >31 && diffDays<=62){
              self.date_type_list = ["Day","Week","Month"];
            }
            if(diffDays >62 && diffDays <=365){
              self.date_type_list = ["Month","Year"];
            }
            if(diffDays >365){
              self.date_type_list = ["Year"];
            }

            dateLocationService.date_type_list = self.date_type_list;

            if(self.date_type_list.indexOf(self.date_selected)<=-1){
              Orders.filters.date_type = self.date_type_list[0];
              self.date_selected = self.date_type_list[0];
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
          self.orders_by_date = data.orders_by_date;
          self.graph = GraphPiechartData.updateGraphData(self.orders_by_date, self.date_selected);
          self.total_orders = self.graph.totalOrders;
          self.total_revenue = self.graph.totalRevenue;
        }

        function updateValues(data){

            self.orders = data;
            Orders.orders = data; /*set orders service to current data so that when you change tabs it is not fetched again*/
            /*setting all required scope parameters*/
            self.total_orders = 0;
            self.total_revenue = 0;

            self.orders_by_date = self.orders.orders_by_date;
            self.orders_by_payment_mode = self.orders.orders_by_payment_mode;
            self.orders_by_sources = self.orders.orders_by_sources;
            self.orders_by_type = self.orders.orders_by_type;
            self.orders_by_status = self.orders.orders_by_status;
            self.orders_by_completion_status = self.orders.orders_by_completion_status;
            self.orders_by_lost_business = self.orders.orders_by_lost_business;
            self.orders_by_users_old_new = self.orders.orders_by_users_old_new;
            /*--*/
            /*setting params for the graphs and pie charts*/
            setGraphAndTotalsParameters();
            setPieChartParameters();
            /*--*/
            
            function setGraphAndTotalsParameters(){
                self.graph = GraphPiechartData.updateGraphData(self.orders_by_date, self.date_selected);
                self.total_orders = self.graph.totalOrders;
                self.total_revenue = self.graph.totalRevenue;
            }

            function setPieChartParameters(){
                self.pieChartGraph = GraphPiechartData.updatePieChartData(self.orders_by_type,self.orders_by_status,self.orders_by_users_old_new);
            }
        }/*function update values ends*/
      /*-----*/
}

})();
