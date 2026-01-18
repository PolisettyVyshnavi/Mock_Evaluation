import express from "express";
import { readDB, writeDB } from "../utils/db.js";

const router = express.Router();

// Create Order
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const db = readDB();

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const newOrder = {
    id: db.orders.length + 1,
    productId,
    quantity,
    totalAmount: product.price * quantity,
    status: "placed",
    createdAt: new Date().toISOString().split("T")[0]
  };

  product.stock -= quantity;
  db.orders.push(newOrder);
  writeDB(db);

  res.status(201).json(newOrder);
});

// Get All Orders
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.orders);
});

export default router;