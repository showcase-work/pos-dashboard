"use strict";

let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let sites = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function fetchOrderDetails (params) {
        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.appApis + "order-details/",
                qs: {
                    order_id: params.order_id,
                    order_type: params.order_type,
                    cloud_site_id: params.cloud_site_id,
                    bill_number: params.bill_number
                }
            },
            (err, res, body) => {
                if (err || body.error) {
                    logger.error("error fetching Orders");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Orders fetch error"
                    });
                    logger.info("fetching orders");
                    return reject(errorObject);
                }
                return resolve(body);
            }
            );
        });
    }

    return {
        fetchOrderDetails
    };
};