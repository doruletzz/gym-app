"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.IS_PROD = void 0;
exports.IS_PROD = process.env.NODE_ENV === 'production';
exports.SECRET = exports.IS_PROD ? process.env.SECRET : 'secret';
