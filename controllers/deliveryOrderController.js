"use strict";

module.exports = app => {
    let deliveryOrderService = app.services.deliveryOrderService;

    /**
    * @api {post} /order Get all orders for a cloud_site_id
    * @apiVersion 1.0.0
    * @apiName FetchOrders
    * @apiGroup Orders
    *
    * @apiBodyParam {JSON Object}
    *    {
    *        "pageSize" : 10,   // required
    *        "pageNumber" : 1,  // required
    *        "cloudSiteId": 32, // required
    *        "query": {          // filters params  
    *           "deliveryTimeDiff": {
    *               "$lt" : 8000000000 ,
    *               "$gt" : 0
    *           },
    *           "turnaroundTime" :{
    *               "$lt" : 10000000000,
    *                "$gt" : 0
    *            },
    *           "pickupTimeDiff" : {
    *                "$lt" : 1000000000,
    *                "$gt" : 0
    *            },
    *            "status" : {
    *                "$in" : ["203"] 
    *           },
    *           "logisticService" :{
    *               "$in" : ["1","5"]
    *           },
    *            "orderId": {
    *                "$regex" : "LTOD"
    *            },
    *            "deliveryRequestTime" : {
    *                "$lt" : "1231231231231",
    *                "$gt" : "0"
    *            },
    *            "locationId" : {
    *                "$in" : ["38"]
    *            }
    *       }
    *   } 
    * @apiSuccess {String} array of json objects with order details
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * [
    *      {
    *        "_id": "575f235d1bf3d33640de5771",
    *        "logisticId": 150181,
    *         "created_at": "2016-06-13T21:19:24.719Z",
    *        "deliveryTimeDiff": 4186000,
    *        "deliveryTime": "2016-04-24T15:43:36.000Z",
    *        "pickupTimeDiff": 1060000,
    *        "pickupTime": "2016-04-24T14:51:30.000Z",
    *        "turnarroundTime": 165000,
    *        "riderAllotedTime": "2016-04-24T14:36:35.000Z",
    *        "deliveryRequestTime": "2016-04-24T14:33:50.000Z",
    *       "payment_mode": null,
    *       "shipmentId": "2211493",
    *        "currentStatus": "208",
    *        "statusDesc": "STATE_DELIVERED",
    *        "status": 208,
    *        "appType": 1,
    *        "deliveryBoyPhone": "9967788094",
    *        "deliveryBoy": "Sarfaraz Patel",
    *        "customerPhone": "9920234545",
    *        "customerName": "Atit",
    *        "logisticService": "Grab",
    *        "locationId": 38,
    *        "cloudSiteId": 32,
    *        "productId": "707745",
    *        "orderId": "LTOD707745",
    *        "updated_at": "2016-06-14T12:12:16.559Z",
    *        "stateArray": [
    *         {
    *            "state_desc": "STATE_REQUESTED_DELIVERY",
    *            "state": 201,
    *            "created_at": "2016-04-24T14:33:53.000Z"
    *          },
    *          {
    *            "state_desc": "STATE_ALLOCATED",
    *            "state": 203,
    *            "created_at": "2016-04-24T14:36:35.000Z"
    *          },
    *          {
    *            "state_desc": "STATE_AT_RESTAURANT",
    *            "state": 205,
    *            "created_at": "2016-04-24T14:51:30.000Z"
    *           },
    *           {
    *             "state_desc": "STATE_OUT_FOR_DELIVERY",
    *            "state": 207,
    *            "created_at": "2016-04-24T14:51:41.000Z"
    *          },
    *          {
    *            "state_desc": "STATE_DELIVERED",
    *            "state": 208,
    *           "created_at": "2016-04-24T15:43:36.000Z"
    *          }
    *        ],
    *        "id": "575f235d1bf3d33640de5771"
    *      }
    *    ]
    *
    * @apiError {Number} status   HTTP Status Code
    * @apiError {Boolean} error   true if error
    * @apiError {String} message  error message
    *
    * @apiErrorExample Error-Response:
    * HTTP/1.1 400 Bad Request
    *  {
    *      "code": 400,
    *      "error": true,    *      "message":  "Validation failed : [\"\"cloud_site_id\" is required\"]"
    *  }
    *
    * @apiErrorExample Error-Response:
    * HTTP/1.1 500 Internal Server Error
    *  {
    *      "code": 404,
    *      "error": true,
    *      "message": "No orders"
    *  }
    */

    function fetchOrders (req, res, next) {
        deliveryOrderService.fetchOrders(req.query,req.body).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };


    function fetchConfiguration (req, res,next) {
        deliveryOrderService.fetchConfiguration(req.query).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    }

    function sendIssueEmail (req, res, next) {
        deliveryOrderService.sendIssueEmail(req.body).then(function(data){
            res.send(data);
        }).catch(err =>next(err));
    }

    return {
        fetchOrders,
        fetchConfiguration,
        sendIssueEmail
    };
};