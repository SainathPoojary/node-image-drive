"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./config/database");
const express_1 = __importDefault(require("express"));
const auth_1 = require("./controllers/auth");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_1 = require("./controllers/user");
const auth_2 = require("./middlewares/auth");
const cloudinary_1 = require("cloudinary");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.get("/", (req, res) => {
    res.status(200).send("Server is up and running.\n");
});
app.post("/api/login", auth_1.login);
app.post("/api/register", auth_1.register);
app.post("/api/logout", auth_1.logout);
app.post("/api/image", auth_2.auth, user_1.uploadImage);
app.put("/api/image", auth_2.auth, user_1.deleteImage);
app.get("/api/user", auth_2.auth, user_1.getUser);
exports.default = app;
