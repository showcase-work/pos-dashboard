"use strict";
let path = require("path");

module.exports = app => {
    let loginService = app.services.loginService;
    let validator = app.validators.loginValidator;

    function handleRoute (req, res, next) {
        /*if (req.cookies.user_details) {*/

                    return res.sendFile(path.join(__dirname + "/../public/html/index.html"));
           /* }
        else {
            console.log("redirecting to login page");
            return res.render("login", { title: "Login", err: "err" });
        }*/

    };

    function loginUser (req, res, next) {
        
        var token = decodeURIComponent(req.params.id);
        var params = new Buffer(token, 'base64').toString('ascii');
        loginService.createToken(JSON.parse(params))    
        .then(user_details => {     
            res.cookie("user_details",JSON.stringify(user_details));
            return res.redirect("/");
        }).catch(err => next(err));

    };

    return {
        handleRoute,
        loginUser
    };
};
