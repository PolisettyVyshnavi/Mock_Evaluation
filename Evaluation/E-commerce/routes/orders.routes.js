import express from "express";
import { createOrder, getAllOrders, cancelOrder, changeOrderStatus } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.delete("/:orderId", cancelOrder);
router.patch("/change-status/:orderId", changeOrderStatus);

export default router;