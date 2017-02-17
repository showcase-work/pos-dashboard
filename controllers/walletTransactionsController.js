"use strict";

module.exports = app => {
    let walletService = app.services.walletService;

    /**
    * @api {get} /services Get all transactions mapped to a wallet id
    * @apiVersion 1.0.0
    * @apiName FetchTransactiond
    * @apiGroup Wallets
    *
    * @apiParam {String} cloud_site_id , page Number
    * @apiSuccess {String} array of json objects with transaction details.
    * 
    *
    * @apiSuccessExample Success-Response:
    * {
    *  "success": "true",
    *  "code": 200,
    *  "description": "transactions",
    * "wallets": [
    *    {
    *      "id": "4",
    *     "transaction_source": "1",
    *      "transaction_dest": "10",
    *      "location_id": "4646",
    *      "transaction": "1",
    *      "type": "debit",
    *      "amount": "55.00",
    *      "transaction_time": "0000-00-00 00:00:00",
    *      "created_at": "2016-05-04 09:21:13",
    *      "updated_at": "2016-05-04 09:21:13",
    *      "deleted_at": null,
    *      "location_name": "Dwarka",
    *      "city": "New Delhi",
    *      "m_service_name": "DELHIVERY",
    *      "m_name": "LOGISTICS"
    *    },
    *    {
    *      "id": "8",
    *      "transaction_source": "1",
    *      "transaction_dest": "10",
    *      "location_id": "4646",
    *      "transaction": "1",
    *      "type": "debit",
    *      "amount": "35.00",
    *      "transaction_time": "0000-00-00 00:00:00",
    *      "created_at": "2016-05-04 09:29:05",
    *      "updated_at": "2016-05-04 09:29:05",
    *      "deleted_at": null,
    *      "location_name": "Dwarka",
    *      "city": "New Delhi",
    *      "m_service_name": "DELHIVERY",
    *      "m_name": "LOGISTICS"
    *   }
    *    "error": "no error",
    *    "transaction_id": -1
    *}
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
    *      "message": "No transactions found
    *  }
    */

    function fetchTransactions (req, res, next) {
        console.log(req.query);
        walletService.fetchTransactions(req.query).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    // API Docs for fetch transaction count

    function fetchTransactionCount (req,res,next) {
        walletService.fetchTransactionCount(req.query).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchTransactions,
        fetchTransactionCount
    };
};
