'use strict';

angular.module('dashboardApp')
  .service('Orders', Orders);


function Orders($rootScope, dateLocationService, $http, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var filters = {
          date_type: "Day",
          date_to: '',
          date_from: '',
          selectedLocation: '',
          offset:0,
          searchOffset:0
        };

    var toggle = {
          revenue:{
            margin:0,
            selected:"mode"
          }, 
          orders:{
            margin:0,
            selected:"mode"
          }, 
          averageBasketSize:{
            margin:0,
            selected:"mode"
          }
    };

    var service = {

        toggle:toggle,

        orders:'',

        allOrders:'',

        orderDetails:'',

        orderDetailsStates:{states:'',status:''},

        selectedOrder:'',

        filters: filters,

        search:{
            noSearchResults:false,
            searchResults:[],
            searchBox:'',
            searching: false
        },
        
        updateOrders: function() {

          /*filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/orders?',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                  }
                        });*/
              console.log(filters.date_type);
              var orders = "";
              if(filters.date_type == "Hour"){
                  orders = {
                    "orders_by_date": [
                        {
                            "revenue": 18679.899978637695,
                            "orders_count": 44,
                            "date": "16 February 2017 11",
                            "date_added": null
                        },
                        {
                            "revenue": 57796.18995666504,
                            "orders_count": 157,
                            "date": "16 February 2017 12",
                            "date_added": null
                        },
                        {
                            "revenue": 58448.1898727417,
                            "orders_count": 188,
                            "date": "16 February 2017 13",
                            "date_added": null
                        },
                        {
                            "revenue": 56282.44992828369,
                            "orders_count": 181,
                            "date": "16 February 2017 14",
                            "date_added": null
                        },
                        {
                            "revenue": 50821.45993804932,
                            "orders_count": 161,
                            "date": "16 February 2017 15",
                            "date_added": null
                        },
                        {
                            "revenue": 57007.10007476807,
                            "orders_count": 167,
                            "date": "16 February 2017 16",
                            "date_added": null
                        },
                        {
                            "revenue": 55589.13986968994,
                            "orders_count": 164,
                            "date": "16 February 2017 17",
                            "date_added": null
                        },
                        {
                            "revenue": 52745.64003753662,
                            "orders_count": 168,
                            "date": "16 February 2017 18",
                            "date_added": null
                        },
                        {
                            "revenue": 67083.53009033203,
                            "orders_count": 185,
                            "date": "16 February 2017 19",
                            "date_added": null
                        },
                        {
                            "revenue": 92097.49981689453,
                            "orders_count": 270,
                            "date": "16 February 2017 20",
                            "date_added": null
                        },
                        {
                            "revenue": 83804.7398223877,
                            "orders_count": 260,
                            "date": "16 February 2017 21",
                            "date_added": null
                        },
                        {
                            "revenue": 52291.52001953125,
                            "orders_count": 153,
                            "date": "16 February 2017 22",
                            "date_added": null
                        },
                        {
                            "revenue": 1706,
                            "orders_count": 5,
                            "date": "16 February 2017 23",
                            "date_added": null
                        }
                    ],
                    "orders_by_sources": [
                        {
                            "source_id": 17,
                            "revenue": 228040,
                            "orders_count": 751,
                            "OrderSource.source_name": "Swiggy",
                            "date_added": null
                        },
                        {
                            "source_id": 2,
                            "revenue": 197200,
                            "orders_count": 462,
                            "OrderSource.source_name": "Online Order",
                            "date_added": null
                        },
                        {
                            "source_id": 13,
                            "revenue": 169690.35969543457,
                            "orders_count": 546,
                            "OrderSource.source_name": "Zomato",
                            "date_added": null
                        },
                        {
                            "source_id": 12,
                            "revenue": 79037.99971008301,
                            "orders_count": 246,
                            "OrderSource.source_name": "Foodpanda",
                            "date_added": null
                        },
                        {
                            "source_id": 20,
                            "revenue": 30026,
                            "orders_count": 97,
                            "OrderSource.source_name": "TAP",
                            "date_added": null
                        },
                        {
                            "source_id": 23,
                            "revenue": 359,
                            "orders_count": 1,
                            "OrderSource.source_name": "Little",
                            "date_added": null
                        }
                    ],
                    "orders_by_payment_mode": [
                        {
                            "payment_mode": 11,
                            "revenue": 428308.04957580566,
                            "orders_count": 1387,
                            "date_added": null
                        },
                        {
                            "payment_mode": 2,
                            "revenue": 199037.3098297119,
                            "orders_count": 559,
                            "date_added": null
                        },
                        {
                            "payment_mode": 1,
                            "revenue": 51556,
                            "orders_count": 95,
                            "date_added": null
                        },
                        {
                            "payment_mode": 3,
                            "revenue": 21877,
                            "orders_count": 49,
                            "date_added": null
                        },
                        {
                            "payment_mode": 9,
                            "revenue": 3575,
                            "orders_count": 13,
                            "date_added": null
                        }
                    ],
                    "orders_by_status": [
                        {
                            "order_status": 1,
                            "revenue": 1200.5,
                            "orders_count": 4,
                            "date_added": null
                        },
                        {
                            "order_status": 2,
                            "revenue": 26879.86003112793,
                            "orders_count": 76,
                            "date_added": null
                        },
                        {
                            "order_status": 3,
                            "revenue": 378443.53994750977,
                            "orders_count": 1068,
                            "date_added": null
                        },
                        {
                            "order_status": 4,
                            "revenue": 18280.710006713867,
                            "orders_count": 48,
                            "date_added": null
                        },
                        {
                            "order_status": 5,
                            "revenue": 299029.9594268799,
                            "orders_count": 959,
                            "date_added": null
                        }
                    ],
                    "orders_by_type": [
                        {
                            "order_type": 0,
                            "revenue": 474971.56939697266,
                            "orders_count": 1347,
                            "date_added": null
                        },
                        {
                            "order_type": 2,
                            "revenue": 229381.79000854492,
                            "orders_count": 756,
                            "date_added": null
                        }
                    ],
                    "orders_by_users_old_new": [
                        {
                            "user_new_old": 1,
                            "count": 593,
                            "date_added": null
                        },
                        {
                            "user_new_old": 2,
                            "count": 818,
                            "date_added": null
                        }
                    ]
                }
              }

              if(filters.date_type == "Day"){
                orders = {
                      "orders_by_date": [
                          {
                              "revenue": 655931.9301757812,
                              "orders_count": 1758,
                              "date": "18 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 770085.0098342896,
                              "orders_count": 2026,
                              "date": "19 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1151518.6996688843,
                              "orders_count": 3244,
                              "date": "20 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1453448.9192352295,
                              "orders_count": 4362,
                              "date": "21 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1608001.6397781372,
                              "orders_count": 4967,
                              "date": "22 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 593993.2299575806,
                              "orders_count": 1721,
                              "date": "23 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 680633.8696060181,
                              "orders_count": 2033,
                              "date": "24 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 812479.0901107788,
                              "orders_count": 2080,
                              "date": "25 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1356756.820465088,
                              "orders_count": 3697,
                              "date": "26 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1115883.4201660156,
                              "orders_count": 3241,
                              "date": "27 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1428742.760673523,
                              "orders_count": 4235,
                              "date": "28 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1520261.8702774048,
                              "orders_count": 4527,
                              "date": "29 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 566652.4900665283,
                              "orders_count": 1524,
                              "date": "30 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 723859.0002746582,
                              "orders_count": 1991,
                              "date": "31 January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 765662.549659729,
                              "orders_count": 2072,
                              "date": "01 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 667730.1597213745,
                              "orders_count": 1825,
                              "date": "02 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 850028.6198577881,
                              "orders_count": 2132,
                              "date": "03 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1057851.9898529053,
                              "orders_count": 2868,
                              "date": "04 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1034499.9999504089,
                              "orders_count": 2807,
                              "date": "05 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 580751.9701194763,
                              "orders_count": 1685,
                              "date": "06 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 628017.9504776001,
                              "orders_count": 1786,
                              "date": "07 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 937790.7490768433,
                              "orders_count": 2916,
                              "date": "08 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 945156.8592147827,
                              "orders_count": 2822,
                              "date": "09 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1193609.0296478271,
                              "orders_count": 3469,
                              "date": "10 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1318169.5992279053,
                              "orders_count": 4042,
                              "date": "11 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1367765.3586044312,
                              "orders_count": 4135,
                              "date": "12 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 711754.3793792725,
                              "orders_count": 2178,
                              "date": "13 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 1026195.2988586426,
                              "orders_count": 3059,
                              "date": "14 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 739647.419593811,
                              "orders_count": 2163,
                              "date": "15 February 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 717177.6594390869,
                              "orders_count": 2154,
                              "date": "16 February 2017",
                              "date_added": null
                          }
                      ],
                      "orders_by_sources": [
                          {
                              "source_id": 2,
                              "revenue": 9844499,
                              "orders_count": 25254,
                              "OrderSource.source_name": "Online Order",
                              "date_added": null
                          },
                          {
                              "source_id": 17,
                              "revenue": 9522441,
                              "orders_count": 29624,
                              "OrderSource.source_name": "Swiggy",
                              "date_added": null
                          },
                          {
                              "source_id": 13,
                              "revenue": 5762396.612937927,
                              "orders_count": 17227,
                              "OrderSource.source_name": "Zomato",
                              "date_added": null
                          },
                          {
                              "source_id": 12,
                              "revenue": 3242458.4099960327,
                              "orders_count": 9629,
                              "OrderSource.source_name": "Foodpanda",
                              "date_added": null
                          },
                          {
                              "source_id": 20,
                              "revenue": 594175.2800292969,
                              "orders_count": 1746,
                              "OrderSource.source_name": "TAP",
                              "date_added": null
                          },
                          {
                              "source_id": 23,
                              "revenue": 13683,
                              "orders_count": 37,
                              "OrderSource.source_name": "Little",
                              "date_added": null
                          },
                          {
                              "source_id": 19,
                              "revenue": 405.0400085449219,
                              "orders_count": 2,
                              "OrderSource.source_name": "Niki",
                              "date_added": null
                          }
                      ],
                      "orders_by_payment_mode": [
                          {
                              "payment_mode": 11,
                              "revenue": 17249453.70415497,
                              "orders_count": 52630,
                              "date_added": null
                          },
                          {
                              "payment_mode": 2,
                              "revenue": 8757785.358787537,
                              "orders_count": 23073,
                              "date_added": null
                          },
                          {
                              "payment_mode": 1,
                              "revenue": 1670154,
                              "orders_count": 4072,
                              "date_added": null
                          },
                          {
                              "payment_mode": 3,
                              "revenue": 918477,
                              "orders_count": 2647,
                              "date_added": null
                          },
                          {
                              "payment_mode": 9,
                              "revenue": 378209,
                              "orders_count": 1085,
                              "date_added": null
                          },
                          {
                              "payment_mode": 10,
                              "revenue": 5222,
                              "orders_count": 11,
                              "date_added": null
                          },
                          {
                              "payment_mode": 0,
                              "revenue": 757.280029296875,
                              "orders_count": 1,
                              "date_added": null
                          }
                      ],
                      "orders_by_status": [
                          {
                              "order_status": 1,
                              "revenue": 31535.740020751953,
                              "orders_count": 75,
                              "date_added": null
                          },
                          {
                              "order_status": 2,
                              "revenue": 846546.430015564,
                              "orders_count": 2283,
                              "date_added": null
                          },
                          {
                              "order_status": 3,
                              "revenue": 16015158.009635925,
                              "orders_count": 44888,
                              "date_added": null
                          },
                          {
                              "order_status": 4,
                              "revenue": 997239.2302932739,
                              "orders_count": 2347,
                              "date_added": null
                          },
                          {
                              "order_status": 5,
                              "revenue": 12118353.903320312,
                              "orders_count": 36348,
                              "date_added": null
                          }
                      ],
                      "orders_by_type": [
                          {
                              "order_type": 0,
                              "revenue": 19369361.00241089,
                              "orders_count": 53546,
                              "date_added": null
                          },
                          {
                              "order_type": 2,
                              "revenue": 9610697.340560913,
                              "orders_count": 29973,
                              "date_added": null
                          }
                      ],
                      "orders_by_users_old_new": [
                          {
                              "user_new_old": 1,
                              "count": 25500,
                              "date_added": null
                          },
                          {
                              "user_new_old": 2,
                              "count": 31149,
                              "date_added": null
                          }
                      ]
                  }
              }

              if(filters.date_type=="Month"){
                var orders = {
                      "orders_by_date": [
                          {
                              "revenue": 18186874.52921295,
                              "orders_count": 47619,
                              "date": "September 2016",
                              "date_added": null
                          },
                          {
                              "revenue": 19099822.366081238,
                              "orders_count": 49668,
                              "date": "October 2016",
                              "date_added": null
                          },
                          {
                              "revenue": 19094210.7762146,
                              "orders_count": 48555,
                              "date": "November 2016",
                              "date_added": null
                          },
                          {
                              "revenue": 24683723.767520905,
                              "orders_count": 62597,
                              "date": "December 2016",
                              "date_added": null
                          },
                          {
                              "revenue": 27691163.231407166,
                              "orders_count": 76386,
                              "date": "January 2017",
                              "date_added": null
                          },
                          {
                              "revenue": 14541809.592681885,
                              "orders_count": 42113,
                              "date": "February 2017",
                              "date_added": null
                          }
                      ],
                      "orders_by_sources": [
                          {
                              "source_id": 17,
                              "revenue": 44203537.13940048,
                              "orders_count": 129582,
                              "OrderSource.source_name": "Swiggy",
                              "date_added": null
                          },
                          {
                              "source_id": 2,
                              "revenue": 40644920.72975922,
                              "orders_count": 92798,
                              "OrderSource.source_name": "Online Order",
                              "date_added": null
                          },
                          {
                              "source_id": 13,
                              "revenue": 25135142.976020813,
                              "orders_count": 67833,
                              "OrderSource.source_name": "Zomato",
                              "date_added": null
                          },
                          {
                              "source_id": 12,
                              "revenue": 12379570.907821655,
                              "orders_count": 34071,
                              "OrderSource.source_name": "Foodpanda",
                              "date_added": null
                          },
                          {
                              "source_id": 20,
                              "revenue": 595191.1800231934,
                              "orders_count": 1749,
                              "OrderSource.source_name": "TAP",
                              "date_added": null
                          },
                          {
                              "source_id": 22,
                              "revenue": 318635.8500671387,
                              "orders_count": 847,
                              "OrderSource.source_name": "MANUAL",
                              "date_added": null
                          },
                          {
                              "source_id": 23,
                              "revenue": 18889,
                              "orders_count": 51,
                              "OrderSource.source_name": "Little",
                              "date_added": null
                          },
                          {
                              "source_id": 19,
                              "revenue": 1716.4800262451172,
                              "orders_count": 7,
                              "OrderSource.source_name": "Niki",
                              "date_added": null
                          }
                      ],
                      "orders_by_payment_mode": [
                          {
                              "payment_mode": 11,
                              "revenue": 57885474.24802399,
                              "orders_count": 162972,
                              "date_added": null
                          },
                          {
                              "payment_mode": 2,
                              "revenue": 52731457.93507767,
                              "orders_count": 135754,
                              "date_added": null
                          },
                          {
                              "payment_mode": 1,
                              "revenue": 8296995.970062256,
                              "orders_count": 17303,
                              "date_added": null
                          },
                          {
                              "payment_mode": 3,
                              "revenue": 2947183.040008545,
                              "orders_count": 7364,
                              "date_added": null
                          },
                          {
                              "payment_mode": 9,
                              "revenue": 1316384,
                              "orders_count": 3251,
                              "date_added": null
                          },
                          {
                              "payment_mode": 10,
                              "revenue": 60626,
                              "orders_count": 140,
                              "date_added": null
                          },
                          {
                              "payment_mode": 0,
                              "revenue": 59483.06994628906,
                              "orders_count": 154,
                              "date_added": null
                          }
                      ],
                      "orders_by_status": [
                          {
                              "order_status": 1,
                              "revenue": 152655.7099609375,
                              "orders_count": 414,
                              "date_added": null
                          },
                          {
                              "order_status": 2,
                              "revenue": 22852921.9153862,
                              "orders_count": 56159,
                              "date_added": null
                          },
                          {
                              "order_status": 3,
                              "revenue": 62281175.588394165,
                              "orders_count": 164731,
                              "date_added": null
                          },
                          {
                              "order_status": 4,
                              "revenue": 2825783.510910034,
                              "orders_count": 6778,
                              "date_added": null
                          },
                          {
                              "order_status": 5,
                              "revenue": 38163506.75933838,
                              "orders_count": 106048,
                              "date_added": null
                          }
                      ],
                      "orders_by_type": [
                          {
                              "order_type": 0,
                              "revenue": 78876415.61358643,
                              "orders_count": 196630,
                              "date_added": null
                          },
                          {
                              "order_type": 2,
                              "revenue": 44421188.64953232,
                              "orders_count": 130308,
                              "date_added": null
                          }
                      ],
                      "orders_by_users_old_new": [
                          {
                              "user_new_old": 1,
                              "count": 91330,
                              "date_added": null
                          },
                          {
                              "user_new_old": 2,
                              "count": 113964,
                              "date_added": null
                          }
                      ]
                  }
              }

              if(filters.date_type=="Year"){
                orders = {
                      "orders_by_date": [
                          {
                              "revenue": 32802006.548145294,
                              "orders_count": 76590,
                              "date": "2015",
                              "date_added": null
                          },
                          {
                              "revenue": 210528384.6415882,
                              "orders_count": 571695,
                              "date": "2016",
                              "date_added": null
                          },
                          {
                              "revenue": 42232972.82408905,
                              "orders_count": 118499,
                              "date": "2017",
                              "date_added": null
                          }
                      ],
                      "orders_by_sources": [
                          {
                              "source_id": 2,
                              "revenue": 123608070.45715714,
                              "orders_count": 285238,
                              "OrderSource.source_name": "Online Order",
                              "date_added": null
                          },
                          {
                              "source_id": 17,
                              "revenue": 91319742.26569748,
                              "orders_count": 278663,
                              "OrderSource.source_name": "Swiggy",
                              "date_added": null
                          },
                          {
                              "source_id": 13,
                              "revenue": 48561781.85630798,
                              "orders_count": 136486,
                              "OrderSource.source_name": "Zomato",
                              "date_added": null
                          },
                          {
                              "source_id": 12,
                              "revenue": 20893043.344701767,
                              "orders_count": 59829,
                              "OrderSource.source_name": "Foodpanda",
                              "date_added": null
                          },
                          {
                              "source_id": 20,
                              "revenue": 595191.1800231934,
                              "orders_count": 1749,
                              "OrderSource.source_name": "TAP",
                              "date_added": null
                          },
                          {
                              "source_id": 22,
                              "revenue": 546472.7300796509,
                              "orders_count": 4671,
                              "OrderSource.source_name": "MANUAL",
                              "date_added": null
                          },
                          {
                              "source_id": 19,
                              "revenue": 20173.17985534668,
                              "orders_count": 97,
                              "OrderSource.source_name": "Niki",
                              "date_added": null
                          },
                          {
                              "source_id": 23,
                              "revenue": 18889,
                              "orders_count": 51,
                              "OrderSource.source_name": "Little",
                              "date_added": null
                          }
                      ],
                      "orders_by_payment_mode": [
                          {
                              "payment_mode": 2,
                              "revenue": 194387340.46540642,
                              "orders_count": 518779,
                              "date_added": null
                          },
                          {
                              "payment_mode": 11,
                              "revenue": 62647845.24800873,
                              "orders_count": 178802,
                              "date_added": null
                          },
                          {
                              "payment_mode": 1,
                              "revenue": 21303980.850074768,
                              "orders_count": 51183,
                              "date_added": null
                          },
                          {
                              "payment_mode": 3,
                              "revenue": 5759131.380386353,
                              "orders_count": 14407,
                              "date_added": null
                          },
                          {
                              "payment_mode": 9,
                              "revenue": 1343019,
                              "orders_count": 3318,
                              "date_added": null
                          },
                          {
                              "payment_mode": 10,
                              "revenue": 60626,
                              "orders_count": 140,
                              "date_added": null
                          },
                          {
                              "payment_mode": 0,
                              "revenue": 59483.06994628906,
                              "orders_count": 154,
                              "date_added": null
                          }
                      ],
                      "orders_by_status": [
                          {
                              "order_status": 0,
                              "revenue": 8754,
                              "orders_count": 10,
                              "date_added": null
                          },
                          {
                              "order_status": 1,
                              "revenue": 2935240.3970212936,
                              "orders_count": 8626,
                              "date_added": null
                          },
                          {
                              "order_status": 2,
                              "revenue": 125636773.35622501,
                              "orders_count": 316938,
                              "date_added": null
                          },
                          {
                              "order_status": 3,
                              "revenue": 121760787.01826954,
                              "orders_count": 343788,
                              "date_added": null
                          },
                          {
                              "order_status": 4,
                              "revenue": 7395310.72136879,
                              "orders_count": 17597,
                              "date_added": null
                          },
                          {
                              "order_status": 5,
                              "revenue": 38165803.639328,
                              "orders_count": 106058,
                              "date_added": null
                          }
                      ],
                      "orders_by_type": [
                          {
                              "order_type": 0,
                              "revenue": 193733968.6081848,
                              "orders_count": 486428,
                              "date_added": null
                          },
                          {
                              "order_type": 2,
                              "revenue": 91829395.40563774,
                              "orders_count": 280356,
                              "date_added": null
                          }
                      ],
                      "orders_by_users_old_new": [
                          {
                              "user_new_old": 1,
                              "count": 231194,
                              "date_added": null
                          },
                          {
                              "user_new_old": 2,
                              "count": 273879,
                              "date_added": null
                          }
                      ]
                  }
              }
            return Promise.resolve(orders);
        },

        updateGraphOrders: function() {
          /*filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/orders/graph?',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                  }
                        });*/

            var newData = "";
            if(filters.date_type == "Week"){
              newData = {
                    "orders_by_date": [
                        {
                            "revenue": 5289271.390617371,
                            "orders_count": 13669,
                            "date": "01 January 2017"
                        },
                        {
                            "revenue": 5575861.860610962,
                            "orders_count": 14727,
                            "date": "02 January 2017"
                        },
                        {
                            "revenue": 6395639.088821411,
                            "orders_count": 17913,
                            "date": "03 January 2017"
                        },
                        {
                            "revenue": 7596490.830757141,
                            "orders_count": 21974,
                            "date": "04 January 2017"
                        },
                        {
                            "revenue": 2810773.3606185913,
                            "orders_count": 8042,
                            "date": "05 January 2017"
                        },
                        {
                            "revenue": 12489.729965209961,
                            "orders_count": 37,
                            "date": "05 February 2017"
                        }
                    ]
                }
            }

            if(filters.date_type == "Hour"){
                newData = {
                  "orders_by_date": [
                      {
                          "revenue": 18679.899978637695,
                          "orders_count": 44,
                          "date": "16 February 2017 11",
                          "date_added": null
                      },
                      {
                          "revenue": 57796.18995666504,
                          "orders_count": 157,
                          "date": "16 February 2017 12",
                          "date_added": null
                      },
                      {
                          "revenue": 58448.1898727417,
                          "orders_count": 188,
                          "date": "16 February 2017 13",
                          "date_added": null
                      },
                      {
                          "revenue": 56282.44992828369,
                          "orders_count": 181,
                          "date": "16 February 2017 14",
                          "date_added": null
                      },
                      {
                          "revenue": 50821.45993804932,
                          "orders_count": 161,
                          "date": "16 February 2017 15",
                          "date_added": null
                      },
                      {
                          "revenue": 57007.10007476807,
                          "orders_count": 167,
                          "date": "16 February 2017 16",
                          "date_added": null
                      },
                      {
                          "revenue": 55589.13986968994,
                          "orders_count": 164,
                          "date": "16 February 2017 17",
                          "date_added": null
                      },
                      {
                          "revenue": 52745.64003753662,
                          "orders_count": 168,
                          "date": "16 February 2017 18",
                          "date_added": null
                      },
                      {
                          "revenue": 67083.53009033203,
                          "orders_count": 185,
                          "date": "16 February 2017 19",
                          "date_added": null
                      },
                      {
                          "revenue": 92097.49981689453,
                          "orders_count": 270,
                          "date": "16 February 2017 20",
                          "date_added": null
                      },
                      {
                          "revenue": 83804.7398223877,
                          "orders_count": 260,
                          "date": "16 February 2017 21",
                          "date_added": null
                      },
                      {
                          "revenue": 52291.52001953125,
                          "orders_count": 153,
                          "date": "16 February 2017 22",
                          "date_added": null
                      },
                      {
                          "revenue": 1706,
                          "orders_count": 5,
                          "date": "16 February 2017 23",
                          "date_added": null
                      }
                  ]
              }
            }

            if(filters.date_type == "Day"){
              newData = {
                    "orders_by_date": [
                        {
                            "revenue": 655931.9301757812,
                            "orders_count": 1758,
                            "date": "18 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 770085.0098342896,
                            "orders_count": 2026,
                            "date": "19 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1151518.6996688843,
                            "orders_count": 3244,
                            "date": "20 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1453448.9192352295,
                            "orders_count": 4362,
                            "date": "21 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1608001.6397781372,
                            "orders_count": 4967,
                            "date": "22 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 593993.2299575806,
                            "orders_count": 1721,
                            "date": "23 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 680633.8696060181,
                            "orders_count": 2033,
                            "date": "24 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 812479.0901107788,
                            "orders_count": 2080,
                            "date": "25 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1356756.820465088,
                            "orders_count": 3697,
                            "date": "26 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1115883.4201660156,
                            "orders_count": 3241,
                            "date": "27 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1428742.760673523,
                            "orders_count": 4235,
                            "date": "28 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1520261.8702774048,
                            "orders_count": 4527,
                            "date": "29 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 566652.4900665283,
                            "orders_count": 1524,
                            "date": "30 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 723859.0002746582,
                            "orders_count": 1991,
                            "date": "31 January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 765662.549659729,
                            "orders_count": 2072,
                            "date": "01 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 667730.1597213745,
                            "orders_count": 1825,
                            "date": "02 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 850028.6198577881,
                            "orders_count": 2132,
                            "date": "03 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1057851.9898529053,
                            "orders_count": 2868,
                            "date": "04 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1034499.9999504089,
                            "orders_count": 2807,
                            "date": "05 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 580751.9701194763,
                            "orders_count": 1685,
                            "date": "06 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 628017.9504776001,
                            "orders_count": 1786,
                            "date": "07 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 937790.7490768433,
                            "orders_count": 2916,
                            "date": "08 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 945156.8592147827,
                            "orders_count": 2822,
                            "date": "09 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1193609.0296478271,
                            "orders_count": 3469,
                            "date": "10 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1318169.5992279053,
                            "orders_count": 4042,
                            "date": "11 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1367765.3586044312,
                            "orders_count": 4135,
                            "date": "12 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 711754.3793792725,
                            "orders_count": 2178,
                            "date": "13 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 1026195.2988586426,
                            "orders_count": 3059,
                            "date": "14 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 739647.419593811,
                            "orders_count": 2163,
                            "date": "15 February 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 717177.6594390869,
                            "orders_count": 2154,
                            "date": "16 February 2017",
                            "date_added": null
                        }
                    ]
                }
            }

            if(filters.date_type=="Month"){
              newData = {
                    "orders_by_date": [
                        {
                            "revenue": 18186874.52921295,
                            "orders_count": 47619,
                            "date": "September 2016",
                            "date_added": null
                        },
                        {
                            "revenue": 19099822.366081238,
                            "orders_count": 49668,
                            "date": "October 2016",
                            "date_added": null
                        },
                        {
                            "revenue": 19094210.7762146,
                            "orders_count": 48555,
                            "date": "November 2016",
                            "date_added": null
                        },
                        {
                            "revenue": 24683723.767520905,
                            "orders_count": 62597,
                            "date": "December 2016",
                            "date_added": null
                        },
                        {
                            "revenue": 27691163.231407166,
                            "orders_count": 76386,
                            "date": "January 2017",
                            "date_added": null
                        },
                        {
                            "revenue": 14541809.592681885,
                            "orders_count": 42113,
                            "date": "February 2017",
                            "date_added": null
                        }
                    ]
                }
            }

            if(filters.date_type=="Year"){
              newData = {
                    "orders_by_date": [
                        {
                            "revenue": 32802006.548145294,
                            "orders_count": 76590,
                            "date": "2015",
                            "date_added": null
                        },
                        {
                            "revenue": 210528384.6415882,
                            "orders_count": 571695,
                            "date": "2016",
                            "date_added": null
                        },
                        {
                            "revenue": 42232972.82408905,
                            "orders_count": 118499,
                            "date": "2017",
                            "date_added": null
                        }
                    ]
                }
            }
            
            return Promise.resolve(newData);
            
            /*return function success(){
              return orders;
            }*/

          //return Promise.resolve(orders);

        },

        updateAllOrders: function() {
          /*filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/allorders/',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                    offset:filters.offset,
                                    pagination:true
                                    }
                        });*/


            var newOrders = 
              [
                  {
                      "id": 9253857,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 284,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:59:15.000Z",
                      "location_id": 3123,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969591,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T18:04:17.000Z",
                      "order_dispatch_time": "2017-02-16T18:16:19.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080402304",
                      "bill_number": "1080402304",
                      "user_new_old": null,
                      "Location.location_id": 3123,
                      "Location.location_name": "Sakinaka - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253820,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 170,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:57:09.000Z",
                      "location_id": 3123,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969581,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:57:28.000Z",
                      "order_dispatch_time": "2017-02-16T18:02:34.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080402229",
                      "bill_number": "1080402229",
                      "user_new_old": null,
                      "Location.location_id": 3123,
                      "Location.location_name": "Sakinaka - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253715,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 350,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:51:23.000Z",
                      "location_id": 3123,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969549,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:51:43.000Z",
                      "order_dispatch_time": "2017-02-16T18:01:11.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080401955",
                      "bill_number": "1080401955",
                      "user_new_old": null,
                      "Location.location_id": 3123,
                      "Location.location_name": "Sakinaka - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253594,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 641,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:45:35.000Z",
                      "location_id": 3123,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969521,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:46:34.000Z",
                      "order_dispatch_time": "2017-02-16T18:05:35.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080401802",
                      "bill_number": "1080401802",
                      "user_new_old": null,
                      "Location.location_id": 3123,
                      "Location.location_name": "Sakinaka - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253291,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 261,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:37:39.000Z",
                      "location_id": 24371,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969470,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:38:05.000Z",
                      "order_dispatch_time": "2017-02-16T17:42:49.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080398743",
                      "bill_number": "1080398743",
                      "user_new_old": null,
                      "Location.location_id": 24371,
                      "Location.location_name": "Chhatrapati Shivaji Terminus, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253112,
                      "cloud_site_id": 1672,
                      "user_id": 10976124,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 424.5,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:29:27.000Z",
                      "location_id": 23804,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969426,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:30:50.000Z",
                      "order_dispatch_time": "2017-02-16T17:31:39.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17404661",
                      "bill_number": "17404661",
                      "user_new_old": 2,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 10976124,
                      "User.first_name": "zain zaidi",
                      "User.last_name": " ",
                      "User.user_email": "",
                      "User.user_mobile_phone_number": "9999132242",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9253087,
                      "cloud_site_id": 1672,
                      "user_id": 10364396,
                      "source_id": 12,
                      "order_status": 4,
                      "order_amount": 205.86,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:28:35.000Z",
                      "location_id": 23221,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969422,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": null,
                      "order_dispatch_time": null,
                      "order_decline_time": "2017-02-16T17:30:53.000Z",
                      "order_delivery_time": null,
                      "reference_bill_number": "s0sa-4hg7",
                      "bill_number": "s0sa-4hg7",
                      "user_new_old": 2,
                      "Location.location_id": 23221,
                      "Location.location_name": "Seasons Mall, Pune",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 20,
                      "User.id": 10364396,
                      "User.first_name": "Chintan Shah",
                      "User.last_name": " ",
                      "User.user_email": "c.n.shah09@gmail.com",
                      "User.user_mobile_phone_number": "9426012399",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9253079,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 248,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:28:06.000Z",
                      "location_id": 23573,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969416,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:31:53.000Z",
                      "order_dispatch_time": "2017-02-16T17:36:32.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080401021",
                      "bill_number": "1080401021",
                      "user_new_old": null,
                      "Location.location_id": 23573,
                      "Location.location_name": "Hitech city, Hyderabad",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 16,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253076,
                      "cloud_site_id": 1672,
                      "user_id": 12503182,
                      "source_id": 12,
                      "order_status": 5,
                      "order_amount": 519.81,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:28:00.000Z",
                      "location_id": 24210,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969415,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:31:11.000Z",
                      "order_dispatch_time": "2017-02-16T17:47:24.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s9kp-gsur",
                      "bill_number": "s9kp-gsur",
                      "user_new_old": 1,
                      "Location.location_id": 24210,
                      "Location.location_name": "Sohna road, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 12503182,
                      "User.first_name": "Shubham",
                      "User.last_name": "Tulshyan",
                      "User.user_email": "shubhamtulshyan@gmail.com",
                      "User.user_mobile_phone_number": "9953991196",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9253073,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 284,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:27:50.000Z",
                      "location_id": 23573,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969413,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:32:17.000Z",
                      "order_dispatch_time": "2017-02-16T17:36:31.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080401023",
                      "bill_number": "1080401023",
                      "user_new_old": null,
                      "Location.location_id": 23573,
                      "Location.location_name": "Hitech city, Hyderabad",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 16,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9253059,
                      "cloud_site_id": 1672,
                      "user_id": 12503180,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 203.55,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:27:08.000Z",
                      "location_id": 23220,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969410,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:36:46.000Z",
                      "order_dispatch_time": "2017-02-16T17:36:48.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17404526",
                      "bill_number": "17404526",
                      "user_new_old": 1,
                      "Location.location_id": 23220,
                      "Location.location_name": "CHEMBUR, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 12503180,
                      "User.first_name": "Aparajit",
                      "User.last_name": "Varadhan",
                      "User.user_email": "9870771057@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9870771057",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9253057,
                      "cloud_site_id": 1672,
                      "user_id": 12503179,
                      "source_id": 12,
                      "order_status": 5,
                      "order_amount": 249.39,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:27:04.000Z",
                      "location_id": 24210,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969409,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:28:05.000Z",
                      "order_dispatch_time": "2017-02-16T17:47:19.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s9kp-smay",
                      "bill_number": "s9kp-smay",
                      "user_new_old": 1,
                      "Location.location_id": 24210,
                      "Location.location_name": "Sohna road, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 12503179,
                      "User.first_name": "Utsav",
                      "User.last_name": "Dutta",
                      "User.user_email": "utsavdante@gmail.com",
                      "User.user_mobile_phone_number": "8308309461",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9253027,
                      "cloud_site_id": 1672,
                      "user_id": 12503172,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 250.72,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:26:03.000Z",
                      "location_id": 23573,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969399,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:27:26.000Z",
                      "order_dispatch_time": "2017-02-16T17:56:36.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17404403",
                      "bill_number": "17404403",
                      "user_new_old": 1,
                      "Location.location_id": 23573,
                      "Location.location_name": "Hitech city, Hyderabad",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 16,
                      "User.id": 12503172,
                      "User.first_name": "Yash",
                      "User.last_name": "",
                      "User.user_email": "9583560803@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9583560803",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9253018,
                      "cloud_site_id": 1672,
                      "user_id": 12503164,
                      "source_id": 13,
                      "order_status": 4,
                      "order_amount": 148.29,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:25:44.000Z",
                      "location_id": 24478,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969395,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": null,
                      "order_dispatch_time": null,
                      "order_decline_time": "2017-02-16T17:26:10.000Z",
                      "order_delivery_time": null,
                      "reference_bill_number": "17404433",
                      "bill_number": "17404433",
                      "user_new_old": 1,
                      "Location.location_id": 24478,
                      "Location.location_name": "Basaveshwar - Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": 12503164,
                      "User.first_name": "Praveen",
                      "User.last_name": "Rprasad",
                      "User.user_email": "8494944027@zomatouseremail.com",
                      "User.user_mobile_phone_number": "8494944027",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252911,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 194,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:21:22.000Z",
                      "location_id": 4476,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969356,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:21:35.000Z",
                      "order_dispatch_time": "2017-02-16T17:30:47.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080400577",
                      "bill_number": "1080400577",
                      "user_new_old": null,
                      "Location.location_id": 4476,
                      "Location.location_name": "Dadar, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252906,
                      "cloud_site_id": 1672,
                      "user_id": 4723334,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 549.69,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:21:09.000Z",
                      "location_id": 3119,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969354,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:22:27.000Z",
                      "order_dispatch_time": "2017-02-16T17:22:30.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17404023",
                      "bill_number": "17404023",
                      "user_new_old": 2,
                      "Location.location_id": 3119,
                      "Location.location_name": "Indirapuram, Ghaziabad",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 3,
                      "User.id": 4723334,
                      "User.first_name": "Somanshu Srivastava",
                      "User.last_name": " ",
                      "User.user_email": "somanshu40@gmail.com",
                      "User.user_mobile_phone_number": "8585955348",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252904,
                      "cloud_site_id": 1672,
                      "user_id": 3244686,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 698.39,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:21:08.000Z",
                      "location_id": 3124,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969352,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:21:31.000Z",
                      "order_dispatch_time": "2017-02-16T17:32:53.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403978",
                      "bill_number": "17403978",
                      "user_new_old": 2,
                      "Location.location_id": 3124,
                      "Location.location_name": "Lower Parel, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 3244686,
                      "User.first_name": "Abhijit Prasad",
                      "User.last_name": " ",
                      "User.user_email": "seekhkebab@gmail.com",
                      "User.user_mobile_phone_number": "7042019829",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252900,
                      "cloud_site_id": 1672,
                      "user_id": 12503134,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 410.2,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:20:57.000Z",
                      "location_id": 3123,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969348,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:21:29.000Z",
                      "order_dispatch_time": "2017-02-16T18:19:16.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403993",
                      "bill_number": "17403993",
                      "user_new_old": 1,
                      "Location.location_id": 3123,
                      "Location.location_name": "Sakinaka - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 12503134,
                      "User.first_name": "Anand",
                      "User.last_name": "",
                      "User.user_email": "9833236982@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9833236982",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252858,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 230,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:20:22.000Z",
                      "location_id": 23220,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969339,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:21:20.000Z",
                      "order_dispatch_time": "2017-02-16T17:36:09.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080400484",
                      "bill_number": "1080400484",
                      "user_new_old": null,
                      "Location.location_id": 23220,
                      "Location.location_name": "CHEMBUR, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252838,
                      "cloud_site_id": 1672,
                      "user_id": 4431008,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 531.48,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:19:41.000Z",
                      "location_id": 3119,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969331,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:20:26.000Z",
                      "order_dispatch_time": "2017-02-16T17:20:31.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403954",
                      "bill_number": "17403954",
                      "user_new_old": 2,
                      "Location.location_id": 3119,
                      "Location.location_name": "Indirapuram, Ghaziabad",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 3,
                      "User.id": 4431008,
                      "User.first_name": "Adhiratna Jha",
                      "User.last_name": " ",
                      "User.user_email": "",
                      "User.user_mobile_phone_number": "8826254449",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252806,
                      "cloud_site_id": 1672,
                      "user_id": 12503121,
                      "source_id": 13,
                      "order_status": 7,
                      "order_amount": 255.39,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:19:13.000Z",
                      "location_id": 4688,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969328,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:23:20.000Z",
                      "order_dispatch_time": "2017-02-16T18:46:10.000Z",
                      "order_decline_time": "2017-02-16T19:11:09.000Z",
                      "order_delivery_time": null,
                      "reference_bill_number": "17403912",
                      "bill_number": "17403912",
                      "user_new_old": 1,
                      "Location.location_id": 4688,
                      "Location.location_name": "New Bel Road, Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": 12503121,
                      "User.first_name": "Avantika",
                      "User.last_name": "Rana",
                      "User.user_email": "7411445150@zomatouseremail.com",
                      "User.user_mobile_phone_number": "7411445150",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252796,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 796,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:18:45.000Z",
                      "location_id": 4476,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969325,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:19:04.000Z",
                      "order_dispatch_time": "2017-02-16T17:31:25.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080400381",
                      "bill_number": "1080400381",
                      "user_new_old": null,
                      "Location.location_id": 4476,
                      "Location.location_name": "Dadar, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252767,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 334,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:17:35.000Z",
                      "location_id": 3662,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969320,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:19:34.000Z",
                      "order_dispatch_time": "2017-02-16T17:40:08.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080400270",
                      "bill_number": "1080400270",
                      "user_new_old": null,
                      "Location.location_id": 3662,
                      "Location.location_name": "Area Commercial Street, Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252742,
                      "cloud_site_id": 1672,
                      "user_id": 10382159,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 147.3,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:16:20.000Z",
                      "location_id": 3670,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969309,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:16:35.000Z",
                      "order_dispatch_time": "2017-02-16T17:28:14.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403669",
                      "bill_number": "17403669",
                      "user_new_old": 2,
                      "Location.location_id": 3670,
                      "Location.location_name": "Phoenix Market City, Pune",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 20,
                      "User.id": 10382159,
                      "User.first_name": "taruni ",
                      "User.last_name": " ",
                      "User.user_email": "tarunisrinath@yahoo.co.in",
                      "User.user_mobile_phone_number": "9912080099",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252720,
                      "cloud_site_id": 1672,
                      "user_id": 10482500,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 264.87,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:15:47.000Z",
                      "location_id": 24210,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969305,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:17:51.000Z",
                      "order_dispatch_time": "2017-02-16T17:21:04.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403587",
                      "bill_number": "17403587",
                      "user_new_old": 2,
                      "Location.location_id": 24210,
                      "Location.location_name": "Sohna road, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 10482500,
                      "User.first_name": "Rahul Singh",
                      "User.last_name": " ",
                      "User.user_email": "rahoo1607@gmail.com",
                      "User.user_mobile_phone_number": "9999823130",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252710,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 530,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:15:09.000Z",
                      "location_id": 3797,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969301,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:19:14.000Z",
                      "order_dispatch_time": "2017-02-16T17:24:05.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080400102",
                      "bill_number": "1080400102",
                      "user_new_old": null,
                      "Location.location_id": 3797,
                      "Location.location_name": "Koramangala, Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252709,
                      "cloud_site_id": 1672,
                      "user_id": 2161171,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 365.99,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:15:07.000Z",
                      "location_id": 3067,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969300,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:18:28.000Z",
                      "order_dispatch_time": "2017-02-16T17:46:36.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403523",
                      "bill_number": "17403523",
                      "user_new_old": 2,
                      "Location.location_id": 3067,
                      "Location.location_name": "Goregaon East, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 2161171,
                      "User.first_name": "sundeepg",
                      "User.last_name": " ",
                      "User.user_email": "",
                      "User.user_mobile_phone_number": "9833323497",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252706,
                      "cloud_site_id": 1672,
                      "user_id": 3271349,
                      "source_id": 2,
                      "order_status": 3,
                      "order_amount": 147,
                      "payment_mode": 1,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:14:57.000Z",
                      "location_id": 23804,
                      "oo_order_id": 1524040,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": null,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": "2017-02-16T17:15:51.000Z",
                      "order_accept_time": "2017-02-16T17:16:41.000Z",
                      "order_dispatch_time": "2017-02-16T17:24:35.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "LTOD1524040",
                      "bill_number": "LTOD1524040",
                      "user_new_old": 2,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 3271349,
                      "User.first_name": "Annu",
                      "User.last_name": " ",
                      "User.user_email": "annu.head@gmail.com",
                      "User.user_mobile_phone_number": "8587882258",
                      "OrderSource.source_id": 2,
                      "OrderSource.source_name": "Online Order"
                  },
                  {
                      "id": 9252671,
                      "cloud_site_id": 1672,
                      "user_id": 3007957,
                      "source_id": 2,
                      "order_status": 3,
                      "order_amount": 400,
                      "payment_mode": 9,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:13:50.000Z",
                      "location_id": 4530,
                      "oo_order_id": 1524038,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": null,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": "2017-02-16T17:14:51.000Z",
                      "order_accept_time": "2017-02-16T17:23:34.000Z",
                      "order_dispatch_time": "2017-02-16T17:51:10.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "LTOD1524038",
                      "bill_number": "LTOD1524038",
                      "user_new_old": 2,
                      "Location.location_id": 4530,
                      "Location.location_name": "Janak Puri, Delhi",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 1,
                      "User.id": 3007957,
                      "User.first_name": "Sumesh KS ",
                      "User.last_name": " ",
                      "User.user_email": "sumeshks2010@yahoo.com",
                      "User.user_mobile_phone_number": "9873560724",
                      "OrderSource.source_id": 2,
                      "OrderSource.source_name": "Online Order"
                  },
                  {
                      "id": 9252668,
                      "cloud_site_id": 1672,
                      "user_id": 10673106,
                      "source_id": 12,
                      "order_status": 5,
                      "order_amount": 151.68,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:13:44.000Z",
                      "location_id": 24481,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969288,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:15:16.000Z",
                      "order_dispatch_time": "2017-02-16T17:23:59.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s7gd-fsb3",
                      "bill_number": "s7gd-fsb3",
                      "user_new_old": 2,
                      "Location.location_id": 24481,
                      "Location.location_name": "Gourmet Hub, Delhi",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 1,
                      "User.id": 10673106,
                      "User.first_name": "Ruchi chaudhary",
                      "User.last_name": " ",
                      "User.user_email": "ruchileo24@gmail.com",
                      "User.user_mobile_phone_number": "9810230704",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9252665,
                      "cloud_site_id": 1672,
                      "user_id": 4363775,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 330.39,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:13:36.000Z",
                      "location_id": 23804,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969286,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:14:52.000Z",
                      "order_dispatch_time": "2017-02-16T17:20:28.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403334",
                      "bill_number": "17403334",
                      "user_new_old": 2,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 4363775,
                      "User.first_name": "S BHATTA ",
                      "User.last_name": " ",
                      "User.user_email": "shrabanabhatta@yahoo.in",
                      "User.user_mobile_phone_number": "8800145279",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252658,
                      "cloud_site_id": 1672,
                      "user_id": 6917259,
                      "source_id": 12,
                      "order_status": 4,
                      "order_amount": 219.38,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:13:15.000Z",
                      "location_id": 23427,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969283,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": null,
                      "order_dispatch_time": null,
                      "order_decline_time": "2017-02-16T17:13:35.000Z",
                      "order_delivery_time": null,
                      "reference_bill_number": "s8aa-3sui",
                      "bill_number": "s8aa-3sui",
                      "user_new_old": 2,
                      "Location.location_id": 23427,
                      "Location.location_name": "Logix Mall - Noida - Sec-32",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 2,
                      "User.id": 6917259,
                      "User.first_name": "Abhinav Palash",
                      "User.last_name": " ",
                      "User.user_email": "abhinavpalash@gmail.com",
                      "User.user_mobile_phone_number": "8790500622",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9252655,
                      "cloud_site_id": 1672,
                      "user_id": 12503095,
                      "source_id": 12,
                      "order_status": 5,
                      "order_amount": 605.87,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:13:10.000Z",
                      "location_id": 4476,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969280,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:13:26.000Z",
                      "order_dispatch_time": "2017-02-16T17:31:36.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s4sz-tt2f",
                      "bill_number": "s4sz-tt2f",
                      "user_new_old": 1,
                      "Location.location_id": 4476,
                      "Location.location_name": "Dadar, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 12503095,
                      "User.first_name": "Ayush",
                      "User.last_name": "Sharma",
                      "User.user_email": "ayucool2050@gmail.com",
                      "User.user_mobile_phone_number": "9755846744",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9252599,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 5,
                      "order_amount": 1197,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:11:42.000Z",
                      "location_id": 4476,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969265,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:11:58.000Z",
                      "order_dispatch_time": "2017-02-16T17:31:28.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080399744",
                      "bill_number": "1080399744",
                      "user_new_old": null,
                      "Location.location_id": 4476,
                      "Location.location_name": "Dadar, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252577,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 247,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:11:11.000Z",
                      "location_id": 3121,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969262,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:11:51.000Z",
                      "order_dispatch_time": "2017-02-16T17:20:14.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080399850",
                      "bill_number": "1080399850",
                      "user_new_old": null,
                      "Location.location_id": 3121,
                      "Location.location_name": "Netaji Subhash Place, Delhi",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 1,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252575,
                      "cloud_site_id": 1672,
                      "user_id": 12091541,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 284.72,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:11:11.000Z",
                      "location_id": 23531,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969260,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:11:55.000Z",
                      "order_dispatch_time": "2017-02-16T17:24:53.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403168",
                      "bill_number": "17403168",
                      "user_new_old": 2,
                      "Location.location_id": 23531,
                      "Location.location_name": "Linking Road - Bandra (West)",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 12091541,
                      "User.first_name": "Pooja",
                      "User.last_name": " ",
                      "User.user_email": "poojadabholkar@gmail.com",
                      "User.user_mobile_phone_number": "8879440127",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252566,
                      "cloud_site_id": 1672,
                      "user_id": 11187576,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 203.47,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:10:34.000Z",
                      "location_id": 23213,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969255,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:10:47.000Z",
                      "order_dispatch_time": "2017-02-16T17:11:06.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403171",
                      "bill_number": "17403171",
                      "user_new_old": 2,
                      "Location.location_id": 23213,
                      "Location.location_name": "Westend Mall Aundh, Pune",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 20,
                      "User.id": 11187576,
                      "User.first_name": "Viraj Bhopatkar",
                      "User.last_name": " ",
                      "User.user_email": "",
                      "User.user_mobile_phone_number": "9689504505",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252562,
                      "cloud_site_id": 1672,
                      "user_id": 11752561,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 218.41,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:10:21.000Z",
                      "location_id": 23804,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969253,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:10:44.000Z",
                      "order_dispatch_time": "2017-02-16T17:15:18.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403147",
                      "bill_number": "17403147",
                      "user_new_old": 2,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 11752561,
                      "User.first_name": "Utsav Nautiyal",
                      "User.last_name": " ",
                      "User.user_email": "9867605538@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9867605538",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252559,
                      "cloud_site_id": 1672,
                      "user_id": 10892279,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 147.3,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:10:09.000Z",
                      "location_id": 3670,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969252,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:10:41.000Z",
                      "order_dispatch_time": "2017-02-16T17:28:13.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403130",
                      "bill_number": "17403130",
                      "user_new_old": 2,
                      "Location.location_id": 3670,
                      "Location.location_name": "Phoenix Market City, Pune",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 20,
                      "User.id": 10892279,
                      "User.first_name": "Yashmaheshwari2",
                      "User.last_name": " ",
                      "User.user_email": "yashmaheshwari2@gmail.com",
                      "User.user_mobile_phone_number": "9303019206",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252543,
                      "cloud_site_id": 1672,
                      "user_id": 10998958,
                      "source_id": 13,
                      "order_status": 2,
                      "order_amount": 206.13,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:09:46.000Z",
                      "location_id": 4688,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969241,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:30:45.000Z",
                      "order_dispatch_time": null,
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403030",
                      "bill_number": "17403030",
                      "user_new_old": 2,
                      "Location.location_id": 4688,
                      "Location.location_name": "New Bel Road, Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": 10998958,
                      "User.first_name": "Tai Kun",
                      "User.last_name": " ",
                      "User.user_email": "sexykunx3@gmail.com",
                      "User.user_mobile_phone_number": "8884832673",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252536,
                      "cloud_site_id": 1672,
                      "user_id": 12503075,
                      "source_id": 13,
                      "order_status": 5,
                      "order_amount": 308.33,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:09:34.000Z",
                      "location_id": 24482,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969238,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:16:10.000Z",
                      "order_dispatch_time": "2017-02-16T17:37:50.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17403076",
                      "bill_number": "17403076",
                      "user_new_old": 1,
                      "Location.location_id": 24482,
                      "Location.location_name": "R City - Ghatkopar - Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 12503075,
                      "User.first_name": "Ajoy",
                      "User.last_name": "Alex",
                      "User.user_email": "9769575467@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9769575467",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252532,
                      "cloud_site_id": 1672,
                      "user_id": 12503072,
                      "source_id": 2,
                      "order_status": 3,
                      "order_amount": 201,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:09:24.000Z",
                      "location_id": 3641,
                      "oo_order_id": 1524031,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": null,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": "2017-02-16T17:09:51.000Z",
                      "order_accept_time": "2017-02-16T17:09:41.000Z",
                      "order_dispatch_time": "2017-02-16T17:09:43.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "LTOD1524031",
                      "bill_number": "LTOD1524031",
                      "user_new_old": 1,
                      "Location.location_id": 3641,
                      "Location.location_name": "Vasant Kunj, Delhi",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 1,
                      "User.id": 12503072,
                      "User.first_name": "Rahul Tokes",
                      "User.last_name": "",
                      "User.user_email": "",
                      "User.user_mobile_phone_number": "9958412662",
                      "OrderSource.source_id": 2,
                      "OrderSource.source_name": "Online Order"
                  },
                  {
                      "id": 9252524,
                      "cloud_site_id": 1672,
                      "user_id": 2027747,
                      "source_id": 2,
                      "order_status": 3,
                      "order_amount": 292,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:09:14.000Z",
                      "location_id": 3124,
                      "oo_order_id": 1524030,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": null,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": "2017-02-16T17:09:51.000Z",
                      "order_accept_time": "2017-02-16T17:09:31.000Z",
                      "order_dispatch_time": "2017-02-16T17:22:43.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "LTOD1524030",
                      "bill_number": "LTOD1524030",
                      "user_new_old": 2,
                      "Location.location_id": 3124,
                      "Location.location_name": "Lower Parel, Mumbai",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 14,
                      "User.id": 2027747,
                      "User.first_name": "Nikhil ",
                      "User.last_name": " ",
                      "User.user_email": "nikhil922@gmail.com",
                      "User.user_mobile_phone_number": "9930471986",
                      "OrderSource.source_id": 2,
                      "OrderSource.source_name": "Online Order"
                  },
                  {
                      "id": 9252519,
                      "cloud_site_id": 1672,
                      "user_id": 12503073,
                      "source_id": 12,
                      "order_status": 3,
                      "order_amount": 272.29,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:09:04.000Z",
                      "location_id": 5154,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969234,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:09:17.000Z",
                      "order_dispatch_time": "2017-02-16T17:09:20.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s0lz-18fz",
                      "bill_number": "s0lz-18fz",
                      "user_new_old": 1,
                      "Location.location_id": 5154,
                      "Location.location_name": "FORUM VIJAYA MALL, CHENNAI",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 15,
                      "User.id": 12503073,
                      "User.first_name": "Naman",
                      "User.last_name": "Verma",
                      "User.user_email": "verma.naman1408@gmail.com",
                      "User.user_mobile_phone_number": "9789625519",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9252516,
                      "cloud_site_id": 1672,
                      "user_id": 12370003,
                      "source_id": 2,
                      "order_status": 3,
                      "order_amount": 2507,
                      "payment_mode": 1,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:08:58.000Z",
                      "location_id": 23804,
                      "oo_order_id": 1524028,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": null,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": "2017-02-16T17:14:51.000Z",
                      "order_accept_time": "2017-02-16T17:14:53.000Z",
                      "order_dispatch_time": "2017-02-16T17:22:31.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "LTOD1524028",
                      "bill_number": "LTOD1524028",
                      "user_new_old": 2,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 12370003,
                      "User.first_name": "piyush bhardwaj",
                      "User.last_name": " ",
                      "User.user_email": "piyushbhardwaj.pecchd@gmail.com",
                      "User.user_mobile_phone_number": "8130344318",
                      "OrderSource.source_id": 2,
                      "OrderSource.source_name": "Online Order"
                  },
                  {
                      "id": 9252501,
                      "cloud_site_id": 1672,
                      "user_id": 12503064,
                      "source_id": 13,
                      "order_status": 4,
                      "order_amount": 166.37,
                      "payment_mode": 2,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:08:10.000Z",
                      "location_id": 4688,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969223,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": null,
                      "order_dispatch_time": null,
                      "order_decline_time": "2017-02-16T18:04:08.000Z",
                      "order_delivery_time": null,
                      "reference_bill_number": "17402947",
                      "bill_number": "17402947",
                      "user_new_old": 1,
                      "Location.location_id": 4688,
                      "Location.location_name": "New Bel Road, Bangalore",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 13,
                      "User.id": 12503064,
                      "User.first_name": "Shikha",
                      "User.last_name": "Das",
                      "User.user_email": "9952998134@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9952998134",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252490,
                      "cloud_site_id": 1672,
                      "user_id": 0,
                      "source_id": 17,
                      "order_status": 3,
                      "order_amount": 169,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:07:48.000Z",
                      "location_id": 24239,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969217,
                      "order_type": 2,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:08:01.000Z",
                      "order_dispatch_time": "2017-02-16T17:15:17.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "1080399483",
                      "bill_number": "1080399483",
                      "user_new_old": null,
                      "Location.location_id": 24239,
                      "Location.location_name": "Laxmi Nagar, Delhi",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 1,
                      "User.id": null,
                      "User.first_name": null,
                      "User.last_name": null,
                      "User.user_email": null,
                      "User.user_mobile_phone_number": null,
                      "OrderSource.source_id": 17,
                      "OrderSource.source_name": "Swiggy"
                  },
                  {
                      "id": 9252481,
                      "cloud_site_id": 1672,
                      "user_id": 12503060,
                      "source_id": 13,
                      "order_status": 3,
                      "order_amount": 319.67,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:07:32.000Z",
                      "location_id": 23804,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969211,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:10:43.000Z",
                      "order_dispatch_time": "2017-02-16T17:13:41.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "17402748",
                      "bill_number": "17402748",
                      "user_new_old": 1,
                      "Location.location_id": 23804,
                      "Location.location_name": "HUDA CITY CENTER, Gurgaon",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 5,
                      "User.id": 12503060,
                      "User.first_name": "Rahul",
                      "User.last_name": "Goel",
                      "User.user_email": "9953745072@zomatouseremail.com",
                      "User.user_mobile_phone_number": "9953745072",
                      "OrderSource.source_id": 13,
                      "OrderSource.source_name": "Zomato"
                  },
                  {
                      "id": 9252447,
                      "cloud_site_id": 1672,
                      "user_id": 12503047,
                      "source_id": 12,
                      "order_status": 2,
                      "order_amount": 158.06,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:06:23.000Z",
                      "location_id": 23221,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969203,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:15:44.000Z",
                      "order_dispatch_time": null,
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s0sa-xhm2",
                      "bill_number": "s0sa-xhm2",
                      "user_new_old": 1,
                      "Location.location_id": 23221,
                      "Location.location_name": "Seasons Mall, Pune",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 20,
                      "User.id": 12503047,
                      "User.first_name": "Lloyd",
                      "User.last_name": "Fernandes",
                      "User.user_email": "lloyd.shop31@gmail.com",
                      "User.user_mobile_phone_number": "9604286215",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  },
                  {
                      "id": 9252431,
                      "cloud_site_id": 1672,
                      "user_id": 4618628,
                      "source_id": 12,
                      "order_status": 5,
                      "order_amount": 202.01,
                      "payment_mode": 11,
                      "order_completion_status": 1,
                      "date_added": "2017-02-16T17:05:40.000Z",
                      "location_id": 23427,
                      "oo_order_id": null,
                      "vn_order_id": null,
                      "pos_order_id": null,
                      "new_pos_order_id": null,
                      "ma_order_id": null,
                      "third_party_order_id": 1969197,
                      "order_type": 0,
                      "campaign_id": null,
                      "order_sent_time": null,
                      "order_accept_time": "2017-02-16T17:06:15.000Z",
                      "order_dispatch_time": "2017-02-16T17:06:17.000Z",
                      "order_decline_time": null,
                      "order_delivery_time": null,
                      "reference_bill_number": "s8aa-zph2",
                      "bill_number": "s8aa-zph2",
                      "user_new_old": 2,
                      "Location.location_id": 23427,
                      "Location.location_name": "Logix Mall - Noida - Sec-32",
                      "Location.cloud_site_id": 1672,
                      "Location.location_city_id": 2,
                      "User.id": 4618628,
                      "User.first_name": "Chirag Khandelwal",
                      "User.last_name": " ",
                      "User.user_email": "Chiragkhandelwal25@outlook.com",
                      "User.user_mobile_phone_number": "9821226958",
                      "OrderSource.source_id": 12,
                      "OrderSource.source_name": "Foodpanda"
                  }
              ]

              return Promise.resolve(newOrders);




        },

        getAllOrdersForCsvExport: function() {
          filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/allorders/',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                    offset:filters.offset,
                                    pagination:false
                                    }
                        });
        },

        searchAllOrders: function(searchFilter) {
          filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/allorders/search',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                    offset:filters.searchOffset,
                                    filter:searchFilter,
                                    pagination:true
                                    }
                        });

        },

        searchAllOrdersForCSVExport: function(searchFilter) {
          filters.selectedLocation = dateLocationService.filters.location;
          filters.date_to = new Date(dateLocationService.filters.date.endDate).getTime();
          filters.date_from = new Date(dateLocationService.filters.date.startDate).getTime();
          return  $http({url:'/api/allorders/search',
                           method:'GET',
                           params:{ date_from:filters.date_from,
                                    date_to:filters.date_to,
                                    cloud_site_id:Auth.getCurrentUser().cloud_site_id,
                                    date_type:filters.date_type,
                                    'location_id[]':filters.selectedLocation,
                                    offset:filters.searchOffset,
                                    filter:searchFilter,
                                    pagination:false
                                    }
                        });

        },
    }

    $rootScope.$on( 'location.changed', function() {
        resetParams();
    });

    $rootScope.$on( 'date.changed', function() {
        resetParams();
    });

    function resetParams(){
      service.orders='';
      service.allOrders='';
    }

    return service;
  }
