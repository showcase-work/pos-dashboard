/**
 * Created by yugandhar23 on 19-04-2016.
 */

"use strict";

let joi = require("joi");

module.exports = app => {

    let searchOrdersParamsSchema = joi.object().keys({
        date_from: joi.date().required(),
        date_to: joi.date().required(),
        location_id: joi.array().required(),
        cloud_site_id: joi.number().required(),
        filter: joi.string().required(),

    });

    return {
        searchOrdersParamsSchema
    };
};

