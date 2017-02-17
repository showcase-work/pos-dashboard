"use strict";
let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let sites = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function fetchHomeData (details,data) {
        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.deliveryApis + "delivery/"+details.cloud_site_id,
                method: "POST",
                json : true,
                body : data
            }, (err, response, body) => {
                if (err || body.error) {
                    logger.error("error fetching delivery home page data");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Deliveries couldn't be fetched"
                    });
                    return reject(errorObject);
                }
                console.log(body);
                return resolve(body);
            });
        });
    };


    function fetchGraphData (details,data) {
        return new Promise((resolve, reject) => {
            console.log(sites.domains.graphApis+"delivery/graph/"+details.cloud_site_id+"/"+details.type,data);
            return request({
                uri: sites.domains.deliveryApis+"delivery/graph/" + details.cloud_site_id+"/"+details.type,
                method: "POST",
                json : true,
                body : data
            }, (err, response, body) => {
                if (err || body.error) {
                    console.log(err,body);
                    logger.error("error fetching graph details");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "garph data fetch error"
                    });
                    logger.info("fetching graph data");
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    };
    return {
        fetchHomeData,
        fetchGraphData
    };
};