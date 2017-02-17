"use strict";

let router = require("express").Router();

module.exports = app => {
    let deliveryGraphController = app.controllers.deliverygraphController;
    let auth = app.middlewares.authentication;

    router.route("/").post(auth.isAuthenticated, (req, res, next) => {
        return deliveryGraphController.fetchGraphData(req, res, next);
    });

    return router;
};