"use strict";

module.exports = app => {
    let locationsService = app.services.locationsService;
    let validator = app.validators.locationsValidator;

    /**
    * @api {get} /locations Get All Locations
    * @apiVersion 1.0.0
    * @apiName FetchLocations
    * @apiGroup Locations
    *
    * @apiParam {String} cloud_site_id Location cloud site id.
    * @apiSuccess {String} location_id Unique Location Id
    * @apiSuccess {String} location_name Location name.
    * @apiSuccess {String} cloud_site_id cloud site id of Location.
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * [
    *   {
    *     "location_id": 4793,
    *     "location_name": "Chennai",
    *     "cloud_site_id": 9881
    *   },
    *   {
    *     "location_id": 4794,
    *     "location_name": "bombay",
    *     "cloud_site_id": 9881
    *   },
    *   {
    *     "location_id": 4795,
    *     "location_name": "New Delhi",
    *     "cloud_site_id": 9881
    *   }
    * ]
    *
    * @apiError {Number} status   HTTP Status Code
    * @apiError {Boolean} error   true if error
    * @apiError {String} message  error message
    *
    * @apiErrorExample Error-Response:
    * HTTP/1.1 400 Bad Request
    *  {
    *      "status": 400,
    *      "error": true,    *      "message":  "Validation failed : [\"\"cloud_site_id\" is required\"]"
    *  }
    *
    * @apiErrorExample Error-Response:
    * HTTP/1.1 500 Internal Server Error
    *  {
    *      "status": 404,
    *      "error": true,
    *      "message": "No locations found"
    *  }
    */

    function fetchLocations (req, res, next) {
        validator.validateLocationsParams(req.query).then(params => {
            return locationsService.fetchLocations(params);
        }).then(data => {
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchLocations
    };
};