"use strict";

module.exports = app => {
    let orderDetailsService = app.services.orderDetailsService;
    let validator = app.validators.orderDetailsValidator;

/**
 * @api {get} /orders Get All Orders
 * @apiVersion 1.0.0
 * @apiName FetchOrders
 * @apiGroup Orders
 *
 * @apiParam {String} cloud_site_id Location cloud site id.
 * @apiParam {String} location_id Location id or Array of Locations.
 * @apiParam {data} date_from Date from.
 * @apiParam {data} date_from Date to.
 * @apiParam {String} date_type Date type which is Day, Week, Month, Year, Date.
 *
 * @apiSuccess {String[]} orders_by_date All Orders grouped by date,
 * @apiSuccess {String[]} orders_by_sources All Orders grouped by Sources.
 * @apiSuccess {String[]} orders_by_payment_mode All Orders grouped by payment mode.
 * @apiSuccess {String[]} orders_by_status All Orders grouped by status.
 * @apiSuccess {String[]} orders_by_completion_status All Orders grouped by Completion Status.
 * @apiSuccess {String[]} orders_by_users_old_new All Orders grouped by Users new or retaining.
 * @apiSuccess {String[]} orders_by_type All Orders grouped by Orders type.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "orders_by_date": [
 *   {
 *     "revenue": 2940,
 *     "orders_count": 2,
 *     "date": 1
 *   },
 *   {
 *     "revenue": 4172.8900146484375,
 *     "orders_count": 10,
 *     "date": 2
 *   },
 *   {
 *     "revenue": 5720,
 *     "orders_count": 7,
 *     "date": 3
 *   },
 *   {
 *     "revenue": 1864,
 *     "orders_count": 4,
 *     "date": 4
 *   },
 *   {
 *     "revenue": 3058,
 *     "orders_count": 8,
 *     "date": 5
 *   },
 *   {
 *     "revenue": 5170,
 *     "orders_count": 11,
 *     "date": 6
 *   },
 *
 * ],
 * "orders_by_sources": [
 *   {
 *     "source_id": 1,
 *     "revenue": 2345.2000122070312,
 *     "orders_count": 4,
 *     "OrderSource.source_name": "Subscriber"
 *   },
 *   {
 *     "source_id": 2,
 *     "revenue": 84263.26022338867,
 *     "orders_count": 162,
 *     "OrderSource.source_name": "Online Order"
 *   },
 *   {
 *     "source_id": 3,
 *     "revenue": 473.3800048828125,
 *     "orders_count": 1,
 *     "OrderSource.source_name": "In Store"
 *   }
 * ],
 * "orders_by_payment_mode": [
 *   {
 *     "payment_mode": 0,
 *     "revenue": 83419.36026000977,
 *     "orders_count": 161
 *   },
 *   {
 *     "payment_mode": 1,
 *     "revenue": 1093.3800048828125,
 *     "orders_count": 2
 *   },
 *   {
 *     "payment_mode": 2,
 *     "revenue": 1680.6199951171875,
 *     "orders_count": 3
 *   },
 *   {
 *     "payment_mode": 3,
 *     "revenue": 888.47998046875,
 *     "orders_count": 1
 *   }
 * ],
 * "orders_by_status": [
 *   {
 *     "order_status": 0,
 *     "revenue": 86338.34024047852,
 *     "orders_count": 165
 *   },
 *   {
 *     "order_status": 1,
 *     "revenue": 743.5,
 *     "orders_count": 2
 *   }
 * ],
 * "orders_by_type": [
 *   {
 *     "order_type": 0,
 *     "revenue": 83559.29025268555,
 *     "orders_count": 161
 *   },
 *   {
 *     "order_type": 1,
 *     "revenue": 2455.239990234375,
 *     "orders_count": 4
 *   },
 *   {
 *     "order_type": 2,
 *     "revenue": 1067.3099975585938,
 *     "orders_count": 2
 *   }
 * ],
 * "orders_by_completion_status": [
 *   {
 *     "order_completion_status": 0,
 *     "revenue": 84444.82022094727,
 *     "orders_count": 161
 *   },
 *   {
 *     "order_completion_status": 1,
 *     "revenue": 2637.02001953125,
 *     "orders_count": 6
 *   }
 * ],
 * "orders_by_users_old_new": [
 *   {
 *     "UserSource.user_new_old": null,
 *     "UserSource.user_id": 0
 *   },
 *   {
 *     "UserSource.user_new_old": 1,
 *     "UserSource.user_id": 108
 *   },
 *   {
 *     "UserSource.user_new_old": 2,
 *     "UserSource.user_id": 536
 *   }
 *  ]
 * }
 *
 * @apiError {Number} status   HTTP Status Code
 * @apiError {Boolean} error   true if error
 * @apiError {String} message  error message
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 *  {
 *      "status": 400,
 *      "error": true,
 *      "message": "Validation failed : [\"\"date_from\" is required\"]"
 *  }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Internal Server Error
 *  {
 *      "status": 500,
 *      "error": true,
 *      "message": "eror fetching orders by sources - Sequelize",
 *  }
 */

    function fetchOrderDetails (req, res, next) {
        validator.validateOrderDetailsSchema(req.query).then(data => {
            return orderDetailsService.fetchOrderDetails(data);
        }).then(data => {
            res.send(data);
        }).catch(err => next(err));
    };


    return {
        fetchOrderDetails
    };
};