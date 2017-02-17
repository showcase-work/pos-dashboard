"use strict";

let router = require("express").Router();

module.exports = app => {
    let walletController = app.controllers.walletController;
    let auth = app.middlewares.authentication;

    router.route("/").get(auth.isAuthenticated, (req, res, next) => {
        return walletController.fetchWalletDetails(req, res, next);
    });

    return router;
};