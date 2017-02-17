"use strict";

let joi = require("joi");

module.exports = app => {

    let loginParamsSchema = joi.object().keys({
        username: joi.string().required(),
        merchcode: joi.string().required()
    });

    return {
        loginParamsSchema
    };
};

