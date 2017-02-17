"use strict";

module.exports = app => {
    let walletService = app.services.walletService;

    /**
    * @api {get} /wallets Get all wallets of a cloud_site_id
    * @apiVersion 1.0.0
    * @apiName FetchWallets
    * @apiGroup Wallets
    *
    * @apiParam {String} cloud_site_id
    * @apiSuccess {String} array of json object with unique wallet id
    * @apiSuccess {String} wallet_id wallet name
    * @apiSuccess {String} balance, created at , updated at
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

    function fetchWalletDetails (req, res, next) {
        walletService.fetchWalletDetails(req.query).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchWalletDetails
    };
};