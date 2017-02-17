"use strict";

let router = require("express").Router();

module.exports = app => {
    let ordersController = app.controllers.ordersController;
    let auth = app.middlewares.authentication;

    router.route("/")
    .get(auth.isAuthenticated, (req, res, next) => {
        return ordersController.fetchOrders(req, res, next);
    });

    router.route("/graph")
    .get(auth.isAuthenticated, (req, res, next) => {
        return ordersController.fetchGraphOrders(req, res, next);
    });

    return router;
};