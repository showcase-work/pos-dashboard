"use strict";

let router = require("express").Router();

module.exports = app => {
    let walletSubscriptionsController = app.controllers.walletSubscriptionsController;
    let auth = app.middlewares.authentication;

    router.route("/").get(auth.isAuthenticated, 
        (req, res, next) => {
        return walletSubscriptionsController.fetchMappedServices(req, res, next);
    });

    return router;
};