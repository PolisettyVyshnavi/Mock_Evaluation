import express from "express";
import { getAllProducts, addProduct } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);

export default router;