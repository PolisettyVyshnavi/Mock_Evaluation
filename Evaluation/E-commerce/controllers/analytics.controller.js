// controllers/analytics.controller.js
import { readDB } from "../models/db.model.js";

export function allOrdersAnalytics(req, res) {
  try {
    const db = readDB();
    const orders = db.orders;
    const count = orders.length;
    const list = orders.map(o => o);
    res.status(200).json({ count, orders: list });
  } catch (err) {
    res.status(500).json({ error: "Failed analytics" });
  }
}

export function cancelledOrdersAnalytics(req, res) {
  try {
    const db = readDB();
    const cancelled = db.orders.filter(o => o.status === "cancelled");
    res.status(200).json({ count: cancelled.length, orders: cancelled });
  } catch (err) {
    res.status(500).json({ error: "Failed analytics" });
  }
}

export function shippedOrdersAnalytics(req, res) {
  try {
    const db = readDB();
    const shipped = db.orders.filter(o => o.status === "shipped");
    res.status(200).json({ count: shipped.length, orders: shipped });
  } catch (err) {
    res.status(500).json({ error: "Failed analytics" });
  }
}

export function totalRevenueByProduct(req, res) {
  try {
    const productId = parseInt(req.params.productId);
    const db = readDB();
    const product = db.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const orders = db.orders.filter(o => o.productId === productId && o.status !== "cancelled");
    const totalRevenue = orders.reduce((sum, o) => sum + (o.quantity * product.price), 0);

    res.status(200).json({ productId, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed analytics" });
  }
}

export function overallRevenue(req, res) {
  try {
    const db = readDB();
    const validOrders = db.orders.filter(o => o.status !== "cancelled");

    const totalRevenue = validOrders.reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return product ? sum + (o.quantity * product.price) : sum;
    }, 0);

    res.status(200).json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed analytics" });
  }
}