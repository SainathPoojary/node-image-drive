import { Request, Response } from "express";
import User from "../models/user";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const { SECRET } = process.env;

export const register = async (req: Request, res: Response) => {
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
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        status: 409,
        code: "user-exist",
        message: "User already exist",
      });

    // encrypt user password
    const hashpassword = await hash(password, 5);

    // create user in database
    const user = await User.create({
      name,
      email,
      password: hashpassword,
      images: [],
      storageUsed: 0,
    });

    // generate token
    if (!SECRET) throw new Error("Secret is not defined");
    const token = sign({ email, user_id: user._id }, SECRET, {
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
  } catch (e) {
    res.status(500).json({
      status: 500,
      code: "server-error",
      message: "Something went wrong!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validate all fields
    if (!(email && password)) res.status(400).send("All fields required");

    // get user from database
    const user = await User.findOne({ email });

    // check if password is correct
    if (!(user && compare(password, user.password)))
      return res
        .status(400)
        .json({ code: "invalid-password", msg: "Invaild email or password" });

    // generate token
    if (!SECRET) throw new Error("Secret is not defined");
    const token = sign({ email, user_id: user._id }, SECRET, {
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
  } catch (e) {
    console.log(e);
    res.send(500).send("Something went wrong!");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token", { sameSite: true });
    res.status(200).json({
      status: 200,
      code: "logout-success",
      msg: "Logout successful",
    });
  } catch {
    res.status(500).send("Something went wrong!");
  }
};
