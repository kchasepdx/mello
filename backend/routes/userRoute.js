import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import dotenv from "dotenv";
import { getToken } from "../util.js";

dotenv.config();
const router = express.Router();

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const newUser = await user.save();
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } catch (error) {
      res.send({ msg: error.message });
    }
  })
);

router.post("/login", async (req, res) => {
  const loginUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (loginUser) {
    res.send({
      _id: loginUser._id,
      name: loginUser.name,
      email: loginUser.email,
      isAdmin: loginUser.isAdmin,
      token: getToken(loginUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

export default router;
