import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import kittyRoute from "./routes/kittyRoute.js";
import productRoute from "./routes/productRoute.js";
import checkoutRoute from "./routes/checkoutRoute.js";

dotenv.config();
mongoose.connect("mongodb://localhost:27017/mello", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/kittens", kittyRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", checkoutRoute);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose connected");
  console.log(db.name);
  console.log("host", db.host);
});

app.listen(5000, () => {
  console.log("server started at http://localhost:5000");
});
