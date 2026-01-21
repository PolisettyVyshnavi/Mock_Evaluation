// routes/analytics.routes.js
import express from "express";
import {
  allOrdersAnalytics,
  cancelledOrdersAnalytics,
  shippedOrdersAnalytics,
  totalRevenueByProduct,
  overallRevenue
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/allorders", allOrdersAnalytics);
router.get("/cancelled-orders", cancelledOrdersAnalytics);
router.get("/shipped", shippedOrdersAnalytics);
router.get("/total-revenue/:productId", totalRevenueByProduct);
router.get("/alltotalrevenue", overallRevenue);

export default router;