"use strict";

let router = require("express").Router();

module.exports = app => {
    let ordersController = app.controllers.ordersController;
    let auth = app.middlewares.authentication;

    router.route("/")
    .get(auth.isAuthenticated, (req, res, next) => {
        return ordersController.fetchAllOrders(req, res, next);
    });

    router.route("/search")
    .get(auth.isAuthenticated, (req, res, next) => {
        return ordersController.searchAllOrders(req, res, next);
    });

    return router;
};