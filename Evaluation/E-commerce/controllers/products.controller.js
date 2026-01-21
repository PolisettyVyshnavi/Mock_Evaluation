import { readDB, writeDB } from "../models/db.model.js";

export function getAllProducts(req, res) {
  try {
    const db = readDB();
    res.status(200).json(db.products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export function addProduct(req, res) {
  try {
    const { name, price, stock } = req.body;
    if (!name || typeof price !== "number" || typeof stock !== "number") {
      return res.status(400).json({ error: "Invalid product payload" });
    }

    const db = readDB();
    const nextId = db.products.length ? db.products[db.products.length - 1].id + 1 : 1;
    const newProduct = { id: nextId, name, price, stock };

    db.products.push(newProduct);
    writeDB(db);

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
}