"use strict";

module.exports = app => {
    let graphService = app.services.graphService;

    /**
    * @api {get} /home Get graph data for a cloud_site_id
    * @apiVersion 1.0.0
    * @apiName FetchWallets
    * @apiGroup Wallets
    *
    * @apiParam {String} cloud_site_id
    * @apiSuccess {String} array of json objects to create pie chart
    * @apiSuccess {String} response time, delivery time, turnaround time
    * @apiSuccess {String} rejection ratio
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * To Be Written
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

    function fetchHomeData (req, res, next) {
        graphService.fetchHomeData(req.query,req.body).then(function(data){
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchHomeData
    };
};