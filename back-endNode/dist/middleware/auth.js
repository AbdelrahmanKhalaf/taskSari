"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const config_1 = __importDefault(require("../config"));
const jwt = require("jsonwebtoken");
const AuthenticationMiddleware = async function (req, res, next) {
    try {
        const token = req.header("Authentication");
        if (!token)
            return next("الوصول مرفوض ، لم يتم توفير رمز مميز");
        const decoded = jwt.verify(token, config_1.default.secretToken);
        const user = await user_model_1.User.findById(decoded._id);
        if (!user)
            return next("Invalid Token");
        res.locals.user = user;
        return next();
    }
    catch (ex) {
        next("Invalid Token");
    }
};
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=auth.js.map