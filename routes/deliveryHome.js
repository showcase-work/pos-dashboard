"use strict";

let router = require("express").Router();

module.exports = app => {
    let deliveryHomeController = app.controllers.deliveryHomeController;
    let auth = app.middlewares.authentication;

    router.route("/").post(auth.isAuthenticated, (req, res, next) => {
        return deliveryHomeController.fetchHomeData(req, res, next);
    });

    return router;
};