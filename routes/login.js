"use strict";

let router = require("express").Router();

module.exports = app => {
    let loginController = app.controllers.loginController;

    router.route("/:id").get((req, res, next) => {
        return loginController.loginUser(req, res, next);
    });

    return router;
};