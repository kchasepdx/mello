import express, { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import Kitten from "../models/kittyModel.js";

const router = express.Router();

const silence = new Kitten({ name: "Silence" });
// console.log(silence.name); // 'Silence'

router.get(
  "/kitties",
  expressAsyncHandler(async (req, res) => {
    try {
      const silence = new Kitten({
        name: "Silence",
      });
      const newKitten = await silence.save();
      res.send(newKitten);
    } catch (error) {
      res.send({ msg: error.message });
    }
  })
);

export default router;
