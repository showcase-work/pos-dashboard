'use strict';
(function(){

angular.module('dashboardApp')
  .component('orders', {
    templateUrl: 'app/orders/orders.html',
    controller: OrdersComponent,
    controllerAs: 'OrdersComponent'
  });

function OrdersComponent(Orders, $scope, $http, dateLocationService, Auth, ngToast, $timeout) {

    var vm = this;
    vm.showOrderDetails = showOrderDetailsFunction;
    vm.loadMoreOrders = loadMoreOrders
    vm.searchInAllOrders = searchInAllOrders
    vm.clearSearch = clearSearch
    vm.loadMoreSearchOrders = loadMoreSearchOrders
    vm.getDeliveryState = getDeliveryState
    vm.getStateTime = getStateTime
    vm.exportCSVHeaders=['Reference Bill Number', 'Bill Number', 'Location', 'Source','Payment Mode','Customer Full Name', 'Customer Email Id', 'Customer Mobile Number', 'Order Date', 'Order Amount'];
    vm.getarraytoDownloadForButton = getarraytoDownloadForButton
    vm.arrayToExportFinal = [];
    /*vm.getDate = getDate;*/
    vm.getPaymentModeFunction = getPaymentModeFunction;
    vm.watchSearchBox = watchSearchBox;

    function watchSearchBox(input) {
      if(!input || input == "") {
        clearSearch();
      }
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

    /*function getDate(dateOriginal) {
      var date = new Date(dateOriginal);
      var newDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
      return newDate
    }*/
    function makeArrayAndExportCSV(data){
      var arrayToExport = [];
      angular.forEach(data, function(order){

          if((order['User.first_name'] && order['User.first_name'] !=null) || (order['User.last_name'] && order['User.last_name'] !=null)){
            var full_name = order['User.first_name']+" "+order['User.last_name'];
          }
          else
          {
            var full_name = " ";
          }

          var payment_mode = getPaymentModeFunction(order.payment_mode);
          
          var details=[order['reference_bill_number'], order['bill_number'], order['Location.location_name'], order['OrderSource.source_name'],payment_mode, full_name, order['User.user_email'], order['User.user_mobile_phone_number'], new Date(order['date_added']), order['order_amount']];
          arrayToExport.push(details);
      })
      vm.arrayToExportFinal = arrayToExport;
      $timeout(function() {
        angular.element('.download-btn-original').triggerHandler('click');
       }, 100);
    }

    function getarraytoDownloadForButton() {
      if(vm.searching){
        Orders.searchAllOrdersForCSVExport($scope.searchBox).success(function(data){
          makeArrayAndExportCSV(data);
        })
      }
      else
      {
        Orders.getAllOrdersForCsvExport().success(function(data){
          makeArrayAndExportCSV(data);
        })
      }
    }


    function getStateTime(time){
      if(time != undefined){
        var length = time.toString().length
        if(length == 10){
          return time*1000;
        }
        else{
          return time;
        }
      }
      
    }

    function getDeliveryState(status){

      switch(status) {

            case 201:
               var status = "Delivery Requested"
               break;
            case 202:
               var status = "Delivery in Process"
               break;
            case 203:
               var status = "Out of Hub"
               break;
            case 204:
               var status = "Delivery Boy Allocated"
               break;
            case 205:
               var status = "At Restaurant"
               break;
            case 206:
               var status = "Waiting for Dispatch"
               break;
            case 207:
               var status = "Out of Delivery"
               break;
            case 208:
               var status = "Delivered"
               break;
            case 209:
               var status = "Cancelled"
               break;
            case 210:
               var status = "Reached Customer"
               break;
            case 221:
               var status = "Declined"
               break;
            case 222:
               var status = "Not Delivered"
               break;
            case 223:
               var status = "Returned"
               break;
            case 224:
               var status = "Rejected"
               break;
            case 225:
               var status = "Unable to Process"
               break;
            case 226:
               var status = "Unable to Request"
               break;
            case 227:
               var status = "No Rider Available"
               break;
            default:
               var status = false;
         } 

         return status; 

    }

    function searchInAllOrders(){
      Orders.filters.searchOffset=0
      vm.noSearchResults = false;
      Orders.search.noSearchResults = vm.noSearchResults;
      vm.searching = "starting";
      Orders.search.searching = vm.searching;
      if($scope.searchBox != undefined && $scope.searchBox != '') {
        Orders.searchAllOrders($scope.searchBox).success(function(data){
          vm.searching = "done";
          Orders.search.searching = vm.searching;
          vm.searchResults = data;
          Orders.search.searchData = vm.searchResults;
          Orders.search.searchBox = $scope.searchBox;
          if(!data || data.length ==0){ 
            vm.noSearchResults = true;
            Orders.search.noSearchResults = vm.noSearchResults;
          }
          
        }).error(function(err){

            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });
      }
      else
      {
        clearSearch();
      }
    }

    function loadMoreSearchOrders(){
      Orders.filters.searchOffset += 50;
      vm.loaderStatus = "loading";

      Orders.searchAllOrders($scope.searchBox).success(function(orders){
        Array.prototype.push.apply(vm.searchResults, orders);
        Orders.search.searchData = vm.searchResults;
        if(orders.length == 0){
          vm.loaderStatus = "nomore";
        }
        else
        {
          vm.loaderStatus = "loaded";
        }
        
      }).error(function(err){

            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });

    }

    function clearSearch(){
      vm.noSearchResults = false;
      vm.searching = false;
      vm.searchResults = null;
      $scope.searchBox = '';

      Orders.search.noSearchResults = vm.noSearchResults
      Orders.search.searching = vm.searching
      Orders.search.searchResults = vm.searchResults
      Orders.search.searchBox = $scope.searchBox;
    }

    function loadMoreOrders(){
      Orders.filters.offset += 50;
      vm.loaderStatus = "loading";

      Orders.updateAllOrders().success(function(orders){
        Array.prototype.push.apply(vm.orders, orders);
        Orders.allOrders = vm.orders;
        if(!orders || orders.length == 0){
          vm.loaderStatus = "nomore";
        }
        else
        {
          vm.loaderStatus = "loaded";
        }
      }).error(function(err){

            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });
    }

    /*initializing -getting orders from service and setting them to scope*/
    if(Orders.allOrders == ""){
        updateOrders();
    }
    else
    {
      if(Orders.search.searching){
        vm.noSearchResults = Orders.search.noSearchResults
        vm.searchResults = Orders.search.searchData;
        $scope.searchBox =Orders.search.searchBox;
        vm.searching = Orders.search.searching;
      }
      vm.orders = Orders.allOrders;
      vm.orderDetails = Orders.orderDetails;
      vm.selectedOrder = Orders.selectedOrder;
      getStatesForOrderDetails();
    }

    $scope.$on( 'location.changed', function() {
           updateOrders();
          });

    $scope.$on( 'date.changed', function() {
        updateOrders();
    });

    $scope.$on( 'refresh.initiated', function() {
        updateOrders();
    });




    function updateOrders() {
      Orders.filters.offset = 0;
      vm.loaderStatus=false;
      dateLocationService.disabled = true;
      vm.ordersLoading = true;
      Orders.updateAllOrders().then(function(orders){
          dateLocationService.disabled = false;
          vm.orders = orders;
          Orders.allOrders = orders;
          vm.orderDetails = Orders.orderDetails;
          if(vm.orderDetails === '') {
              vm.showOrderDetails(orders[0]);
              vm.selectedOrder = orders[0];
              Orders.selectedOrder = vm.selectedOrder;
          }
          vm.ordersLoading = false;
          if(!orders || orders.length == 0){
            vm.loaderStatus="nomore";
          }
      })/*.error(function(err){

            ngToast.create({
              className: 'warning',
              content: 'There was a problem fetching the data. Please try again'
            });
            
           });*/
    }

  /*shows order details on click*/
    function showOrderDetailsFunction(order){
      if(order != undefined){
          vm.orderDetails = "";
          vm.orderStatus = "";
          Orders.orderDetails = vm.orderDetails;
          vm.selectedOrder = order;
          Orders.selectedOrder = vm.selectedOrder;
          var currentUser = Auth.getCurrentUser();
          var cloud_site_id = currentUser.cloud_site_id;
          if(order.third_party_order_id && order.third_party_order_id !=0) {
            var order_id = order.third_party_order_id;
            var order_type = "third_party";
          }
          else if(order['OrderSource.source_name'] == "Online Order")
          {
            var order_id = order.oo_order_id;
            var order_type = "oo";
          }
          else if(order['OrderSource.source_name'] == "POS")
          {
            var order_id = order.new_pos_order_id;
            var order_type = "pos";
          }          
          $http({url:'/api/order-details/',
                 method:'GET',
                 params:{ 
                  order_id:order_id,
                  order_type:order_type,
                  cloud_site_id:cloud_site_id,
                  bill_number:order.bill_number
                 }}).success(function(data){

                    if(data.error){
                      vm.orderDetails = "err";
                    }
                    else
                    {
                      if(order_type == "third_party"){
                        order.apiData = data.details;
                      }
                      else{
                        order.apiData = data.data.order;
                      }
                      vm.orderDetails = order;

                      getStatesForOrderDetails();
                      /*source_id=11
                      order_type=0
                      {Created:null,Prepared:null,Dispatched:null,Delivered:null,Cancelled:null}*/
                    }
                    Orders.orderDetails = vm.orderDetails;

                 }).error(function(data){
                  vm.orderDetails = "err";
                  Orders.orderDetails = vm.orderDetails;
                 })

      }
      else
      {
        vm.orderDetails = "err";
      }
      
    }

    function getStatesForOrderDetails(){
      if(vm.orderDetails.order_type==0){
        if(vm.orderDetails.source_id == 11){
          vm.states={Created:null,Prepared:null,Dispatched:null,Delivered:null,Cancelled:null}
          var temp_states = {1:true,150:true, 13:true, 3:true,207:true, 5:true, 12:true};
        }
        else
        {
          vm.states={Created:null,Accepted:null,Prepared:null,Dispatched:null,Delivered:null,Cancelled:null}
          var temp_states = {1:true,150:true, 2:true, 200:true, 13:true, 3:true,207:true, 5:true, 12:true};
        }
      }
      else if(vm.orderDetails.order_type==1 || vm.orderDetails.order_type==2){
        vm.states={Created:null,Prepared:null,Closed:null}
        var temp_states = {1:true,150:true,13:true, 11:true,};
      }
      

      angular.forEach(vm.orderDetails.apiData.status, function(state){
        if(temp_states[state.status]){
          switch(state.status) {
                case 1:
                   vm.states.Created=state;
                   vm.orderStatus="Order has been Created"
                   break;
                case 2:
                   vm.states.Accepted=state;
                   vm.orderStatus="Order has been Accepted"
                   break;
                case 3:
                   vm.states.Dispatched=state;
                   vm.orderStatus="Order has been Dispatched"
                   break;
                case 13:
                   vm.states.Prepared=state;
                   vm.orderStatus="Order has been Prepared"
                   break;
                case 5:
                   vm.states.Delivered=state;
                   vm.orderStatus="Order has been Delivered"
                   break;
                case 11:
                   vm.states.Closed=state;
                   vm.orderStatus="Order has been Closed"
                   break;
                case 12:
                   vm.states.Cancelled=state;
                   vm.orderStatus="Order has been Cancelled"
                   break;
                case 150:
                   vm.states.Created=state;
                   vm.orderStatus="Order has been Created"
                   break;
                case 200:
                   vm.states.Accepted=state;
                   vm.orderStatus="Order has been Accepted"
                   break;
                case 207:
                   vm.states.Dispatched=state;
                   vm.orderStatus="Order has been Dispatched"
                   break;
                case 221:
                   vm.states.Cancelled=state;
                   vm.orderStatus="Order has been Cancelled"
                   break;
                case 209:
                   vm.states.Cancelled=state;
                   vm.orderStatus="Order has been Cancelled"
                   break;
             }  
        }                  
      })
    }

}

})();
