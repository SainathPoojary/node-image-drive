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
exports.getUser = exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const user_1 = __importDefault(require("../models/user"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.files);
        // check if files are uploaded
        if (!(req.files && req.files.images)) {
            return res.status(400).send("No files were uploaded.");
        }
        // if single file then convert it to array
        const files = (!Array.isArray(req.files.images) ? [req.files.images] : req.files.images);
        // check if file type is image
        for (const file of files) {
            if (!file.mimetype.startsWith("image")) {
                return res.status(400).json({
                    status: 400,
                    code: "invalid-file-type",
                    message: "Only images are allowed",
                });
            }
        }
        // check if user exists
        const user = yield user_1.default.findOne({ email: req.user.email });
        if (!user)
            return res.send(400).send("User not found");
        // check if user has enough storage
        const storageLimit = Number(process.env.STORAGE_LIMIT);
        if (user.storageUsed +
            files.reduce((acc, file) => acc + file.size / 1024 / 1024, 0) >
            storageLimit) {
            return res.status(400).json({
                status: 400,
                code: "storage-limit-exceeded",
                message: "Storage limit exceeded",
            });
        }
        // upload to cloudinary
        for (const file of files) {
            const result = yield cloudinary_1.v2.uploader.upload(file.tempFilePath, {
                folder: `node-image-drive/${req.user.user_id}`,
                filename_override: file.name,
            });
            console.log(result.original_filename);
            user.images.push({
                public_id: result.public_id,
                url: result.secure_url,
                name: result.original_filename,
                size: result.bytes,
            });
            user.storageUsed = Number((user.storageUsed + file.size / 1024 / 1024).toFixed(2)); // in MB
        }
        // save user
        yield user.save();
        // send response
        res.status(200).json({
            name: user.name,
            email: user.email,
            images: user.images,
            storageUsed: user.storageUsed,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            code: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.uploadImage = uploadImage;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id } = req.body;
    // check if public_id is provided
    if (!public_id)
        return res.status(400).send("No image selected");
    // check if user has this image or not
    const user = yield user_1.default.findOne({
        email: req.user.email,
        "images.public_id": public_id,
    });
    // if user not found
    if (!user)
        return res.status(400).send("Image not found");
    // delete image from cloudinary
    yield cloudinary_1.v2.uploader.destroy(public_id);
    // delete image from user
    const removedImage = user.images.splice(user.images.findIndex((image) => image.public_id === public_id), 1);
    // update storageUsed
    user.storageUsed = Number((user.storageUsed - removedImage[0].size / 1024 / 1024).toFixed(2));
    // save user
    yield user.save();
    res.status(200).json(user);
});
exports.deleteImage = deleteImage;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.user.email });
        if (!user)
            return res.status(400).send("User not found");
        res.status(200).json({
            name: user.name,
            email: user.email,
            images: user.images,
            storageUsed: user.storageUsed,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong!");
    }
});
exports.getUser = getUser;
