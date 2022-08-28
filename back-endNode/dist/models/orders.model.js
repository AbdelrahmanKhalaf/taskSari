"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.validateOrder = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const schema = new mongoose_1.Schema({
    items: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                required: true
            }
        }],
    nameStore: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongodb_1.ObjectID,
        ref: "users",
        required: true
    }
});
async function validateOrder(order) {
    const schema = await {
        address: joi_1.default.string().required(),
    };
    return joi_1.default.validate(order, schema);
}
exports.validateOrder = validateOrder;
exports.Order = mongoose_1.default.model("orders", schema);
//# sourceMappingURL=orders.model.js.map