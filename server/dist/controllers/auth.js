"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const { SECRET } = process.env;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // validate the fields
        if (!(name && email && password))
            return res.status(400).json({
                status: 400,
                code: "missing-fields",
                message: "All fields required",
            });
        // check if user already exist
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser)
            return res.status(409).json({
                status: 409,
                code: "user-exist",
                message: "User already exist",
            });
        // encrypt user password
        const hashpassword = yield (0, bcrypt_1.hash)(password, 5);
        // create user in database
        const user = yield user_1.default.create({
            name,
            email,
            password: hashpassword,
            images: [],
            storageUsed: 0,
        });
        // generate token
        if (!SECRET)
            throw new Error("Secret is not defined");
        const token = (0, jsonwebtoken_1.sign)({ email, user_id: user._id }, SECRET, {
            expiresIn: "2h",
        });
        // return new user
        console.log(new Date(Date.now() + 2 * 60 * 60 * 1000));
        res
            .status(201)
            .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            sameSite: true,
        })
            .json({
            name: user.name,
            email: user.email,
            images: user.images,
            storageUsed: user.storageUsed,
        });
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            code: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // validate all fields
        if (!(email && password))
            res.status(400).send("All fields required");
        // get user from database
        const user = yield user_1.default.findOne({ email });
        // check if password is correct
        if (!(user && (0, bcrypt_1.compare)(password, user.password)))
            return res
                .status(400)
                .json({ code: "invalid-password", msg: "Invaild email or password" });
        // generate token
        if (!SECRET)
            throw new Error("Secret is not defined");
        const token = (0, jsonwebtoken_1.sign)({ email, user_id: user._id }, SECRET, {
            expiresIn: "2h",
        });
        console.log(token);
        // return user
        res
            .status(200)
            .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            sameSite: true,
        })
            .json({
            name: user.name,
            email: user.email,
            images: user.images,
            storageUsed: user.storageUsed,
        });
    }
    catch (e) {
        console.log(e);
        res.send(500).send("Something went wrong!");
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token", { sameSite: true });
        res.status(200).json({
            status: 200,
            code: "logout-success",
            msg: "Logout successful",
        });
    }
    catch (_a) {
        res.status(500).send("Something went wrong!");
    }
});
exports.logout = logout;
