"use strict";

let router = require("express").Router();

module.exports = app => {
    let locationsController = app.controllers.locationsController;
    let auth = app.middlewares.authentication;

    router.route("/").get(auth.isAuthenticated, (req, res, next) => {
        return locationsController.fetchLocations(req, res, next);
    });

    return router;
};