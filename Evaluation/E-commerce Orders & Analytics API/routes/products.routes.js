import express from "express";
import { readDB, writeDB } from "../utils/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, price, stock } = req.body;
  const db = readDB();

  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: "Missing name, price, or stock" });
  }

  const newProduct = {
    id: db.products.length ? db.products[db.products.length - 1].id + 1 : 1,
    name,
    price,
    stock
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({ message: "Product created", product: newProduct });
});

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

export default router;