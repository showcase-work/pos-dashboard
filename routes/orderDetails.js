"use strict";

let router = require("express").Router();

module.exports = app => {
    let orderDetailsController = app.controllers.orderDetailsController;
    let auth = app.middlewares.authentication;

    router.route("/")
    .get(auth.isAuthenticated, (req, res, next) => {
        return orderDetailsController.fetchOrderDetails(req, res, next);
    });

    return router;

};