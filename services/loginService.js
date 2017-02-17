"use strict";
let request = require("request");
let jwt = require("jsonwebtoken");
let base64 = require("base-64");
let CryptoJS = require("crypto-js");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let servicesVariables = app.config.servicesVariables;
    let logger = app.helpers.logger;

    function authenticateToken (token) {
        return new Promise((resolve, reject) => {
            return request({
                uri: servicesVariables.domains.userAuth + "authenticate",
                method: "GET",
                qs: {token: token}
            }, (err, response, body) => {
                response = JSON.parse(body);
                if (err || response.error) {
                    logger.error("error fetching User from user api");
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "error in authenticating token,redirected to login page"
                    });
                    return reject(errorObject);
                }
                logger.info("fetching User details");
                return resolve(response);
            });
        });
    }

    function fetchLoginParams (username, merchcode) {
        var usertoken = base64.encode(username + ":" + merchcode);
        return new Promise((resolve, reject) => {
            return request({
                headers: {
                    "usertoken": "usertoken"
                },
                uri: servicesVariables.domains.userAuth + "users",
                method: "POST"
            }, function (err, data, body) {
                if (!body || err) {
                    let errorObject = errorFormatter.createErrorObject({
                        status: 500,
                        message: "Auth Params fetch error"
                    });
                    logger.error("error decoding login params");
                    return reject(errorObject);
                }
                return resolve(body);
            });
        });
    }

    function fetchPayloadFromToken (token) {
        return new Promise((resolve, reject) => {
            var params = jwt.decode(token);
            params.token = token;
            if (!params) {
                let errorObject = errorFormatter.createErrorObject({
                    status: 500,
                    message: "decoding token error - Sequelize"
                });
                return reject(errorObject);
            }
            return resolve(params);
        });

    }

    function decryptReq(request) {
        return new Promise((resolve,reject)=>{
            var decryptedParams = CryptoJS.AES.decrypt(request, '3969768f330793753db50282c7745142');
            var params = decryptedParams.toString(CryptoJS.enc.Utf8);
            if(!params || params == '')
            {
                let errorObject = errorFormatter.createErrorObject({
                    status: 500,
                    message: "No Params there"
                });
                return reject(errorObject);
            }
            return resolve(JSON.parse(params));
        });
    }

    function createToken(params) {
        return new Promise((resolve,reject) => {
            var token = jwt.sign({ params }, servicesVariables.secret.key, {expiresIn: 60 * 60 * 5});
            if(!token || token == ""){
                let errorObject = errorFormatter.createErrorObject({
                    status: 500,
                    message: "error in creating the token"
                });
                return reject(errorObject);
            }
            var new_params = {
                              cloud_site_id:params.cloudSiteId, 
                              restaurant_name: '', 
                              username: params.userName, 
                              passowrd: params.passWord, 
                              token: token
                             }

            return resolve(new_params);
        });

    }

    return {
        authenticateToken,
        fetchLoginParams,
        fetchPayloadFromToken,
        decryptReq,
        createToken
    };
};