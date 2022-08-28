"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./../models/user.model");
const path_1 = __importDefault(require("path"));
const orders_model_1 = require("../models/orders.model");
const user_router_1 = __importDefault(require("./user.router"));
const fs_1 = __importDefault(require("fs"));
const addTotalPrice_1 = require("../helpers/addTotalPrice");
user_router_1.default.post('/createOrder/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let rawdata = fs_1.default.readFileSync(path_1.default.join(__dirname, "../data/prodacts.json"));
        let Prodacts = JSON.parse(rawdata);
        const { address, } = req.body;
        const { error } = (0, orders_model_1.validateOrder)(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const addressSelect = await user_model_1.User.findOne({ _id: id }, { addresses: { $elemMatch: { _id: address } } });
        if (!addressSelect)
            return res.status(400).send({
                error_en: "the address you selected was not found",
            });
        const newOrder = new orders_model_1.Order({
            items: Prodacts.stores[0].items.map((item) => {
                return {
                    name: item.name,
                    price: item.price,
                    totalPrice: item.totalPrice,
                    currency: item.currency,
                    unit: item.unit,
                    quantity: item.quantity
                };
            }),
            nameStore: Prodacts.stores[0].name,
            totalAmount: (0, addTotalPrice_1.totla)(Prodacts.stores[0].items),
            address: addressSelect.addresses[0].address,
            userId: id
        });
        newOrder.save();
        return res.status(200).send({ order: newOrder });
    }
    catch (ex) {
        throw ex;
    }
});
exports.default = user_router_1.default;
//# sourceMappingURL=order.router.js.map