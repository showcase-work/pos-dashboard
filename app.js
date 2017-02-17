"use strict";
console.log(process.env);
let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();

consign()
    .include("./helpers")
    .then("./middlewares/basicSettings.js")
    .then("./config")
    .then("./validators/schemas")
    .then("./validators")
    .then("./middlewares/staticResources.js")
    .then("./services")
    .then("./controllers")
    .then("./middlewares/authentication.js")
    .then("./routes")
    .then("./middlewares/mainRoutes.js")
    .then("./middlewares/errorHandler.js")
    .into(app);

let appPort = process.env.APP_PORT || "8080";

if (process.env.NODE_ENV !== "test") {
    app.listen(appPort, () => {
        logger.info(`Server started on port ${appPort}`);
    });
}

module.exports = app;