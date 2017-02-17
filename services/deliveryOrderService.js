"use strict";
let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let sites = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function fetchOrders (details,data) {
        for(var key in data){
            if(key == 'turnaroundTimeDiff' || key == 'deliveryTimeDiff' || key == 'pickupTimeDiff'){
               data[key].to = data[key].to*60*1000;
                data[key].from = data[key].from*60*1000;
            }
        }
        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.deliveryApis + "delivery/fetchOrders",
                method: "POST",
                json : true,
                body : data
            }, (err, response, body) => {
                if (err || body.error) {
                    logger.error("error fetching orders data");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Orders couldn't be fetched"
                    });
                    console.log(err);
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    };


    function fetchConfiguration(details){
        console.log(details);
        return new Promise((resolve, reject) => {
            return request({
                uri : sites.domains.deliveryApis + "delivery/mappedPartners/" +details.cloud_site_id ,
                method : "GET",
            }, (err, response,body) => {
                if (err || body.error) {
                    logger.error("error fetching orders data");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Orders couldn't be fetched"
                    });
                    console.log(err);
                    return reject(errorObject);
                }
                return resolve(body);
            })
        });
    };


    function sendIssueEmail(data){
        return new Promise((resolve, reject)=>{
            return request({
                uri : sites.domains.deliveryApis + "delivery/mail/sendMail",
                method : "POST",
                json : true,
                body : data
            }, (err, response, body) => {
                if(err || body.error) {
                    console.log(err,body.err,body)
                    logger.error("Error sending mail to admin");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Some error occured while reporting issue"
                    });
                    console.log(err);
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    }

    return {
        fetchOrders,
        fetchConfiguration,
        sendIssueEmail
    };
};