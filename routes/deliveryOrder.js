"use strict";

let router = require("express").Router();

module.exports = app => {
    let deliveryOrderController = app.controllers.deliveryOrderController;
    let auth = app.middlewares.authentication;

    router.route("/").post(auth.isAuthenticated, (req, res, next) => {
        return deliveryOrderController.fetchOrders(req, res, next);
    });

    router.route("/config").get(auth.isAuthenticated, (req, res,next)=> {
    	return deliveryOrderController.fetchConfiguration(req, res, next);
    });

    router.route("/email").post(auth.isAuthenticated, (req, res, next) => {
    	return deliveryOrderController.sendIssueEmail(req, res, next);
    });
    return router;
};