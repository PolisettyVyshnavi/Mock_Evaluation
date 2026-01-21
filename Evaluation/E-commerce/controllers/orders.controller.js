import { readDB, writeDB } from "../models/db.model.js";

export function createOrder(req, res) {
  try {
    const { productId, quantity } = req.body;
    const db = readDB();

    const product = db.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.stock === 0 || quantity > product.stock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const totalAmount = product.price * quantity;
    const nextId = db.orders.length ? db.orders[db.orders.length - 1].id + 1 : 1;

    const newOrder = {
      id: nextId,
      productId,
      quantity,
      totalAmount,
      status: "placed",
      createdAt: new Date().toISOString().split("T")[0]
    };

    db.orders.push(newOrder);
    product.stock -= quantity;
    writeDB(db);

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

export function getAllOrders(req, res) {
  try {
    const db = readDB();
    res.status(200).json(db.orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

export function cancelOrder(req, res) {
  try {
    const orderId = parseInt(req.params.orderId);
    const db = readDB();
    const order = db.orders.find(o => o.id === orderId);

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status === "cancelled") return res.status(400).json({ error: "Order already cancelled" });

    const today = new Date().toISOString().split("T")[0];
    if (order.createdAt !== today) {
      return res.status(400).json({ error: "Cancellation only allowed on same day" });
    }

    order.status = "cancelled";
    const product = db.products.find(p => p.id === order.productId);
    if (product) product.stock += order.quantity;

    writeDB(db);
    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
}

export function changeOrderStatus(req, res) {
  try {
    const orderId = parseInt(req.params.orderId);
    const db = readDB();
    const order = db.orders.find(o => o.id === orderId);

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status === "cancelled" || order.status === "delivered") {
      return res.status(400).json({ error: "Cannot change status of cancelled or delivered order" });
    }

    const flow = ["placed", "shipped", "delivered"];
    const currentIndex = flow.indexOf(order.status);
    order.status = flow[currentIndex + 1];

    writeDB(db);
    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to change order status" });
  }
}