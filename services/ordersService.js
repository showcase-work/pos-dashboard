"use strict";

let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let sites = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function fetchOrders (params) {

        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.appApis + "orders",
                qs: {
                    date_from: params.date_from,
                    date_to: params.date_to,
                    cloud_site_id: params.cloud_site_id,
                    date_type: params.date_type,
                    'location_id[]':params.location_id,
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
                resolve(body);
            }
            );
        });
    }

    function fetchGraphOrders (params) {

        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.appApis + "orders/graph",
                qs: {
                    date_from: params.date_from,
                    date_to: params.date_to,
                    cloud_site_id: params.cloud_site_id,
                    date_type: params.date_type,
                    'location_id[]':params.location_id,
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
                resolve(body);
            }
            );
        });
    }

    function fetchAllOrders (params) {

        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.appApis + "allorders",
                qs: {
                    date_from: params.date_from,
                    date_to: params.date_to,
                    cloud_site_id: params.cloud_site_id,
                    date_type: params.date_type,
                    'location_id[]':params.location_id,
                    offset:params.offset,
                    pagination:params.pagination
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
                resolve(body);
            }
            );
        });
    }

    function fetchSearchOrderResults(params) {

        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.appApis + "allorders/search",
                qs: {
                    date_from: params.date_from,
                    date_to: params.date_to,
                    cloud_site_id: params.cloud_site_id,
                    date_type: params.date_type,
                    'location_id[]':params.location_id,
                    offset:params.offset,
                    filter:params.filter,
                    pagination:params.pagination
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
                resolve(body);
            }
            );
        });
    }

    return {
        fetchOrders,
        fetchAllOrders,
        fetchSearchOrderResults,
        fetchGraphOrders,

    };
};