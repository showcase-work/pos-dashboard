"use strict";

let router = require("express").Router();

module.exports = app => {
    let walletTransactionsController = app.controllers.walletTransactionsController;
    let auth = app.middlewares.authentication;

    router.route("/").get(auth.isAuthenticated, (req, res, next) => {
        return walletTransactionsController.fetchTransactions(req, res, next);
    });

    router.route("/transactionCount").get(auth.isAuthenticated, (req,res,next) => {
    	return walletTransactionsController.fetchTransactionCount(req,res,next);
    });

    return router;
};