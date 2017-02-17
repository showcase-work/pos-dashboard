"use strict";

let joi = require("joi");

module.exports = app => {

    let orderDetailsSchema = joi.object().keys({
        order_type: joi.string().required(),
        order_id: joi.number().required()
    });

    return {
        orderDetailsSchema
    };
};

