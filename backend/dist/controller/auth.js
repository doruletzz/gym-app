"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_jwt_1 = require("express-jwt");
const config_1 = require("../config");
const getTokenFromCookie = (req) => {
    // console.log(req.cookies.token);
    return req.cookies.token;
};
exports.auth = {
    required: (0, express_jwt_1.expressjwt)({
        secret: config_1.SECRET,
        algorithms: ['HS256'],
        getToken: getTokenFromCookie,
    }),
};
