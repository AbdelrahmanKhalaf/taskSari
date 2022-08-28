"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default
    .connect(`mongodb+srv://abdo2020:01123689625@temwork-vxavl.mongodb.net/userLo?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("connected to mongoDB...");
})
    .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .use((0, cookie_parser_1.default)())
    .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authentication, X-Requested-With");
    next();
})
    .use(express_1.default.json())
    .use("/uploads", express_1.default.static("./uploads"))
    .use("/api/v1/user/", user_router_1.default)
    .use("/api/v1/auth/login", auth_router_1.default);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listing now to PORT ${PORT}...`);
});
//# sourceMappingURL=server.js.map