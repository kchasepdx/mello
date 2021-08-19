import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { authenticateToken, isAdmin } from "../util.js";

const router = express.Router();

router.get("/editproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      res.send(products);
    }
  } catch (error) {
    res.send("error getting products");
  }
});

router.post("/editproducts", authenticateToken, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
    });
    const newProduct = await product.save();
    res.send(newProduct);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    }
  } catch (error) {
    res.send("error getting product");
  }
});

router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const categoryList = await Product.find({ category: category });
    if (categoryList) {
      res.send(categoryList);
    }
  } catch (error) {
    res.send("error getting products");
  }
});

router.put("/editproducts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const editProduct = await Product.findById(id);
    if (editProduct) {
      editProduct.name = req.body.name;
      editProduct.price = req.body.price;
      editProduct.image = req.body.image;
      editProduct.brand = req.body.brand;
      editProduct.category = req.body.category;
      editProduct.countInStock = req.body.countInStock;
      editProduct.description = req.body.description;

      const updatedProduct = await editProduct.save();
      res.send(updatedProduct);
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct });
      } else {
        res.send({ message: "updated product could not be saved" });
      }
    }
  } catch (error) {
    console.log("product not found");
  }
});

router.put("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Product.deleteOne({ _id: id });
    if (deleted) {
      return res.status(200).send({ message: "Product Deleted" });
    }
  } catch (error) {
    res.send({ message: "product not deleted" });
  }
});

export default router;

// ask David -- isAdmin not working
