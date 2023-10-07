import "dotenv/config";
import "./config/database";

import express from "express";
import { login, logout, register } from "./controllers/auth";
import fileUpload from "express-fileupload";
import { deleteImage, getUser, uploadImage } from "./controllers/user";
import { auth } from "./middlewares/auth";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./models/user";

const app = express();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running.\n");
});

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/logout", logout);
app.post("/api/image", auth, uploadImage);
app.put("/api/image", auth, deleteImage);
app.get("/api/user", auth, getUser);

export default app;
