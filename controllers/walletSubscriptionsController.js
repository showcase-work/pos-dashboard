"use strict";

module.exports = app => {
    let walletService = app.services.walletService;

    /**
    * @api {get} /services Get all services mapped to a wallet_id
    * @apiVersion 1.0.0
    * @apiName FetchSubscriptions
    * @apiGroup Wallets
    *
    * @apiParam {String} cloud_site_id
    * @apiSuccess {String} json object with locations json in services array
    * 
    *
    * @apiSuccessExample Success-Response:
    * {
    *  "success": "true",
    *  "code": 200,
    *  "description": "services",
    *  "wallets": [
    *   {
    *      "location_id": "38",
    *      "service_id": "1",
    *      "wallet_id": "3",
    *     "id": "1",
    *      "m_id": "1",
    *      "m_name": "LOGISTIC",
    *      "m_service_id": "2",
    *      "m_service_name": "delhivery",
    *     "public_key": null,
    *      "private_key": "",
    *      "created_at": "0000-00-00 00:00:00",
    *      "updated_at": "0000-00-00 00:00:00",
    *      "deleted_at": "0000-00-00 00:00:00",
    *      "location_name": "Greater Kailash-1",
    *      "city": "Delhi"
    *    },
    *   {
    *     "location_id": "49",
    *      "service_id": "1",
    *      "wallet_id": "3",
    *      "id": "1",
    *      "m_id": "1",
    *      "m_name": "LOGISTIC",
    *     "m_service_id": "2",
    *      "m_service_name": "delhivery",
    *      "public_key": null,
    *      "private_key": "",
    *     "created_at": "0000-00-00 00:00:00",
    *      "updated_at": "0000-00-00 00:00:00",
    *      "deleted_at": "0000-00-00 00:00:00",
    *      "location_name": "Sohna Road",
    *      "city": "Gurgaon"
    *    },
    *    {
    *      "location_id": "3353",
    *      "service_id": "1",
    *      "wallet_id": "3",
    *      "id": "1",
    *     "m_id": "1",
    *      "m_name": "LOGISTIC",
    *      "m_service_id": "2",
    *      "m_service_name": "delhivery",
    *      "public_key": null,
    *     "private_key": "",
    *      "created_at": "0000-00-00 00:00:00",
    *       "updated_at": "0000-00-00 00:00:00",
    *       "deleted_at": "0000-00-00 00:00:00",
    *       "location_name": "Saket 1",
    *       "city": "New Delhi"
    *    },
    *    {
    *      "location_id": "4384",
    *      "service_id": "1",
    *      "wallet_id": "3",
    *      "id": "1",
    *      "m_id": "1",
    *      "m_name": "LOGISTIC",
    *      "m_service_id": "2",
    *      "m_service_name": "delhivery",
    **      "public_key": null,
    *      "private_key": "",
    *      "created_at": "0000-00-00 00:00:00",
    **     "updated_at": "0000-00-00 00:00:00",
    *     "deleted_at": "0000-00-00 00:00:00",
    *      "location_name": "Test Outlet 3",
    *      "city": "Delhi"
    *    },
    *    {
    *      "location_id": "5747",
    *      "service_id": "1",
    *      "wallet_id": "3",
    *      "id": "1",
    *      "m_id": "1",
    *      "m_name": "LOGISTIC",
    *      "m_service_id": "2",
    *      "m_service_name": "delhivery",
    *      "public_key": null,
    *      "private_key": "",
    *      "created_at": "0000-00-00 00:00:00",
    *      "updated_at": "0000-00-00 00:00:00",
    *      "deleted_at": "0000-00-00 00:00:00",
    *      "location_name": "niki.ai Test Location",
    *      "city": "Delhi"
    *    },
    *    {
    *      "location_id": "6128",
    *     "service_id": "1",
    *      "wallet_id": "3",
    *      "id": "1",
    *     "m_id": "1",
    *      "m_name": "LOGISTIC",
    *      "m_service_id": "2",
    *      "m_service_name": "delhivery",
    *      "public_key": null,
    *     "private_key": "",
    *      "created_at": "0000-00-00 00:00:00",
    *      "updated_at": "0000-00-00 00:00:00",
    *      "deleted_at": "0000-00-00 00:00:00",
    *      "location_name": "hauz khas",
    *      "city": "Delhi"
    *    }
    *  ],
    *  "error": "no error",
    *  "transaction_id": -1
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
    *      "message": "No wallet found"
    *  }
    */

    function fetchMappedServices (req, res, next) {
        walletService.fetchMappedServices(req.query).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchMappedServices
    };
};
