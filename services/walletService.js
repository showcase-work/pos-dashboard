"use strict";
let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let sites = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function fetchWalletDetails (details) {

        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.walletApis + "wallets/" + details.cloud_site_id,
                method: "GET"
            }, (err, response, body) => {
                if (err || body.error) {
                    logger.error("error fetching wallet details");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Wallet Details fetch error"
                    });
                    logger.info("fetching wallet details");
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    }

    function fetchMappedServices(details) {
        return new Promise((resolve, reject) => {
            return request({
                uri: sites.domains.walletApis + "transaction/subscriptions/"+details.walletID,
                method : "GET"
            }, (err, response, body) => {
                if(err || body.error) {
                    logger.error("Error Fetching services for wallet");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Wallet services fetch error"
                    });
                    logger.info("fetching wallet details");
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    }

    function fetchTransactions(details) {
        return new Promise((resolve,reject) => {
            console.log(sites.domains.walletApis+ "transaction/transactions/"+details.walletID+"/"+details.page)
            return request({
                uri:sites.domains.walletApis + "transaction/transactions/"+details.walletID+"/"+details.page,
                method : "GET"
            }, (err, response, body) => {
                if(err || body.error) {
                    logger.error("Error Fetching transactions for wallet");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Wallet Transactions fetch error"
                    });
                    logger.info("fetching wallet transactions");
                    return reject(errorObject);
                }
                return resolve(body);
            })
        })
    }

    function fetchTransactionCount(details) {
        return new Promise((resolve,reject) => {
            return request({
                uri:sites.domains.walletApis + "transaction/transactionCount/" + details.walletID,
                method : "GET",
            }, (err, response, body) =>{
                if(err || body.error) {
                    logger.error("Error Fetching transactions for wallet");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Wallet Transactions Count fetch error"
                    });
                    logger.info("fetching wallet transactions");
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    }

    return {
        fetchWalletDetails,
        fetchTransactions,
        fetchTransactionCount,
        fetchMappedServices
    };
};