'use strict';

angular.module('dashboardApp')
  .factory('GraphPiechartData', GraphPiechartData);


function GraphPiechartData() {
  var graphData={revenue_for_graph:[], orders_for_graph:[], colors:["#40c381","#35968B"], totalOrders:0, totalRevenue:0};
  var pieChartGraphData = {totals:{orders:0,customers:0,acceptance_rate:{total_orders:0,accepted_orders:0},lost_business:0}, orders_type:[], acceptance_rate:[{key:"Accepted",y:0,color:'#66cc9a'},{key:"Pending",y:0,color:'#a3e0c1'},{key:"Declined",y:0,color:'#dbf3e6'}], lost_business:[{key:"Pending",y:0,color:'#9fdc96'},{key:"Canceled",y:0,color:'#c2e9bc'},{key:"Declined",y:0,color:'#e2e9e1'}], customers_new_old:[{key:"New",y:0,color:"#f5bb36"},{key:"Retaining", y:0, color:"#f9d685"}]};
  var factory = {

    updateGraphData: function(orders_by_date, date_type_selected){
        /*setting data*/
        graphData.totalOrders=0;
        graphData.totalRevenue=0;
        pieChartGraphData.totals.orders=0;
        graphData.revenue_for_graph=[];
        graphData.orders_for_graph=[];

        angular.forEach(orders_by_date, function(order){
            
             graphData.totalOrders+=order.orders_count;
             pieChartGraphData.totals.orders+=order.orders_count;

             graphData.totalRevenue+=order.revenue;

             if(date_type_selected == "Hour") {
              console.log()
              graphData.revenue_for_graph.push({x:new Date(order.date+":00").getTime(), y:order.revenue});
              graphData.orders_for_graph.push({x:new Date(order.date+":00").getTime(), y:order.orders_count});

             }
             else if(date_type_selected == "Week") {
              graphData.revenue_for_graph.push({x:order.date, y:order.revenue});
              graphData.orders_for_graph.push({x:order.date, y:order.orders_count});
             }
             else
             {
                graphData.revenue_for_graph.push({x:new Date(order.date).getTime(), y:order.revenue});
                graphData.orders_for_graph.push({x:new Date(order.date).getTime(), y:order.orders_count});
             }
        });

        /*graphData.revenue_for_graph.push({x:null, y:null});
        graphData.orders_for_graph.push({x:null, y:null});

        graphData.revenue_for_graph.unshift({x:null, y:null});
        graphData.orders_for_graph.unshift({x:null, y:null});*/



        /*function setInitialAndFinalValues(date_type_selected) {
          if(date_type_selected == "Day"){
            if(graphData.revenue_for_graph[0].x != 1) {
                graphData.revenue_for_graph.unshift({x:1, y:0});
                graphData.orders_for_graph.unshift({x:1, y:0});
            }
            if(graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x != 31 && graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x < 31) {
                graphData.revenue_for_graph.push({x:31, y:0});
                graphData.orders_for_graph.push({x:31, y:0});
            }
          }

          if(date_type_selected == "Hour"){
            if(graphData.revenue_for_graph[0].x != 1) {
                graphData.revenue_for_graph.unshift({x:1, y:0});
                graphData.orders_for_graph.unshift({x:1, y:0});
            }
            if(graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x != 24 && graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x < 24) {
                graphData.revenue_for_graph.push({x:24, y:0});
                graphData.orders_for_graph.push({x:24, y:0});
            }
          }

          if(date_type_selected == "Month"){
            if(graphData.revenue_for_graph[0].x != 1) {
                graphData.revenue_for_graph.unshift({x:1, y:0});
                graphData.orders_for_graph.unshift({x:1, y:0});
            }
            if(graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x != 12 && graphData.revenue_for_graph[graphData.revenue_for_graph.length-1].x < 12) {
                graphData.revenue_for_graph.push({x:12, y:0});
                graphData.orders_for_graph.push({x:12, y:0});
            }
          }
        }

        setInitialAndFinalValues(date_type_selected);*/

        return graphData;
        /*---*/
    },

    updatePieChartData: function(orders_by_type,orders_by_status,orders_by_users_old_new){

        function setPieChartDataForOrdersByType(orders_by_type){
          pieChartGraphData.orders_type=[];
            angular.forEach(orders_by_type, function(order){
                  if(order.order_type == 0){
                    var order_type = "Delivery";
                    var color= "#63c3b8";
                  }
                  if(order.order_type == 1){
                    var order_type = "Dinein";
                    var color= "#a2dbd4";
                  }
                  if(order.order_type == 2){
                    var order_type = "Takeaway";
                    var color= "#c6e9e5";
                  }
                 pieChartGraphData.orders_type.push({key:order_type, y:order.orders_count, color:color});
            });
        }



        function setPieChartDataForOrdersByAcceptanceRateAndLostBusiness(orders_by_acceptance_rate){
            pieChartGraphData.lost_business[0].y = 0;
            pieChartGraphData.lost_business[1].y = 0;
            pieChartGraphData.lost_business[2].y = 0;
            pieChartGraphData.acceptance_rate[0].y = 0;
            pieChartGraphData.acceptance_rate[1].y = 0;
            pieChartGraphData.acceptance_rate[2].y = 0;
            pieChartGraphData.totals.lost_business = 0;
            pieChartGraphData.totals.acceptance_rate.accepted_orders = 0;
            pieChartGraphData.totals.acceptance_rate.total_orders = 0;

            angular.forEach(orders_by_acceptance_rate, function(order){
                  if(order.order_status == 0 || order.order_status == 1) {
                    /*Pending*/
                    pieChartGraphData.lost_business[0].y+=order.revenue;
                    pieChartGraphData.acceptance_rate[1].y+=order.orders_count
                    
                    pieChartGraphData.totals.lost_business+=order.revenue;
                    pieChartGraphData.totals.acceptance_rate.total_orders+=order.orders_count;

                  }
                  if(order.order_status == 2 || order.order_status==3 || order.order_status==5 || order.order_status==11) {
                    /*Accepted*/
                    pieChartGraphData.acceptance_rate[0].y+=order.orders_count;

                    pieChartGraphData.totals.acceptance_rate.accepted_orders+=order.orders_count;
                    pieChartGraphData.totals.acceptance_rate.total_orders+=order.orders_count;

                  }
                  if(order.order_status == 4){
                    /*Declined*/
                    pieChartGraphData.lost_business[2].y+=order.revenue;
                    pieChartGraphData.acceptance_rate[2].y+=order.orders_count;

                    pieChartGraphData.totals.lost_business+=order.revenue;
                    pieChartGraphData.totals.acceptance_rate.total_orders+=order.orders_count;

                  }
                  if(order.order_status==12){
                    /*Accepted for acceptance rate, Cancelled for lost busoness*/
                    pieChartGraphData.lost_business[1].y+=order.revenue;
                    pieChartGraphData.acceptance_rate[0].y+=order.orders_count;

                    pieChartGraphData.totals.lost_business+=order.revenue;
                    pieChartGraphData.totals.acceptance_rate.accepted_orders+=order.orders_count;
                    pieChartGraphData.totals.acceptance_rate.total_orders+=order.orders_count;
                  }
            });
        }
        

        function setPieChartDataForOrdersByUsersNewOld(orders_by_users_old_new){
            pieChartGraphData.customers_new_old[0].y = 0;
            pieChartGraphData.customers_new_old[1].y = 0;
            pieChartGraphData.totals.customers = 0;

            angular.forEach(orders_by_users_old_new, function(order){
                  if(order.user_new_old == 1) {
                    // new
                    pieChartGraphData.customers_new_old[0].y=order.count;
                    pieChartGraphData.totals.customers+=order.count;
                  }
                  if(order.user_new_old == 2) {
                    // retaining
                    pieChartGraphData.customers_new_old[1].y=order.count;
                    pieChartGraphData.totals.customers+=order.count;
                  }
            });
        }

        setPieChartDataForOrdersByType(orders_by_type);
        setPieChartDataForOrdersByAcceptanceRateAndLostBusiness(orders_by_status);
        setPieChartDataForOrdersByUsersNewOld(orders_by_users_old_new);

        return pieChartGraphData;

    }
    
  }

  return factory;
}
