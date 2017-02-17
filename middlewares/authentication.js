"use strict";
let path = require("path");
let jwt = require("jsonwebtoken");


module.exports = app => {

    let servicesVariables = app.config.servicesVariables;

        function isAuthenticated(req, res, next) {

            var token = req.headers.authorization;

            jwt.verify(token, servicesVariables.secret.key, function(err, decoded) {
              if(err && err != null) {
                res.clearCookie('user_details'); 
                res.redirect('/');
              }
              else
              {
                return next();
              }
            });
        }

    return {
        isAuthenticated
    };
};
