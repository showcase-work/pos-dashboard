"use strict";

module.exports = app => {
    let graphService = app.services.graphService;

    /**
    * @api {get} /graph Get graph data for a cloud_site_id
    * @apiVersion 1.0.0
    * @apiName FetchgraphData
    * @apiGroup Delviery graph
    *
    * @apiParam {String} cloud_site_id
    * @apiSuccess {String} array of json objects to bar chart
    * @apiSuccess {String} array of json objects to create a line chart
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *      "success": "true",
    *      "code": 200,
    *      "description": "wallet details",
    *      "wallets": [
    *        {
    *          "id": "12",
    *          "identifier": "Salad Bowl Wallet",
    *          "amount": "-3269.26",
    *          "cloud_site_id": "2997",
    *          "type": "0",
    *          "min_balance": "0.00",
    *          "active": "1",
    *          "created_at": "2016-05-05 08:30:17",
    *          "updated_at": "2016-06-08 14:59:07",
    *          "deleted_at": null
    *        },
    *        {
    *          "id": "10",
    *          "identifier": "Veggies Kitchen Wallet",
    *          "amount": "269.26",
    *          "cloud_site_id": "2997",
    *          "type": "0",
    *          "min_balance": "100.00",
    *          "active": "1",
    *          "created_at": "2016-05-05 08:30:17",
    *          "updated_at": "2016-06-08 14:59:07",
    *          "deleted_at": null
    *        }
    *      ],
    *      "error": "no error",
    *      "transaction_id": -1
    *    }
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
    *      "message": "No wallet found"
    *  }
    */

    function fetchGraphData (req, res, next) {
        console.log(req.query);
        console.log(req.body ,"Yuvraj");
        graphService.fetchGraphData(req.query,req.body).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchGraphData
    };
};