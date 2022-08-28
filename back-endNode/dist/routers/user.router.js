"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middleware/auth");
const user_model_1 = require("./../models/user.model");
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post('/register', async (req, res, next) => {
    const { name, password, confirmPassword, phone, email } = req.body;
    const { error } = (0, user_model_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const user = await user_model_1.User.find({ email: email });
    if (user[0]) {
        res.status(400).send({ error: "Email already taken!!" });
    }
    let nameUser = await user_model_1.User.findOne({ name: name });
    if (nameUser)
        return res.status(400).send({
            error_en: "that name already exist",
            error_ar: "هذا الاسم موجود بالفعل",
        });
    const vildeLowercase = /(?=.*?[a-z])/;
    const vildeCaptalercase = /(?=.*?[A-Z])/;
    if (!vildeCaptalercase.test(password))
        return res.status(400).send({
            error_en: "It must contain at least 1 uppercase alphabetic character",
            error_ar: " كلمة السر يجب أن يحتوي على حرف أبجدي واحد كبير على الأقل ",
        });
    if (!vildeLowercase.test(password))
        return res.status(400).send({
            error_en: "It must contain at least one lowercase alphabet",
            error_ar: " كلمةالسر يجب أن يحتوي على حرف أبجدي صغير واحد على الأقل",
        });
    if (password !== confirmPassword)
        return res.status(400).send({
            error_en: "Password does not match",
            error_ar: " كلمة السر غير متطابقة",
        });
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashPassword = await bcryptjs_1.default.hash(password, salt);
    const hashConfriPassword = await bcryptjs_1.default.hash(confirmPassword, salt);
    const register = new user_model_1.User({
        name: name,
        password: hashPassword,
        confirmPassword: hashConfriPassword,
        email: email,
        phone: phone,
    });
    return register.save((err) => {
        console.log(err);
        if (!err) {
            return res.status(200).send({ data: register });
        }
        else {
            res.status(400).send(err);
        }
        return;
    });
});
router.get('/user', [auth_1.AuthenticationMiddleware], async (Req, res) => {
    const user = await user_model_1.User.findOne({ _id: res.locals.user._id });
    res.status(200).send(user);
});
exports.default = router;
//# sourceMappingURL=user.router.js.map