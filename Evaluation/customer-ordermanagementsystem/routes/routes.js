const express = require("express");
const router = express.Router();

const customerCtrl = require("../controllers/customerController.js");
const orderCtrl = require("../controllers/orderController.js");
const { validateCustomer, validateOrder } = require("../validations/middleware.js");

router.post("/register", validateCustomer, customerCtrl.registerCustomer);
router.delete("/delete-customer/:customerId", customerCtrl.deleteCustomer);

router.post("/add-order", validateOrder, orderCtrl.addOrder);
router.get("/get-my-orders/:customerId", orderCtrl.getMyOrders);
router.put("/update-order/:orderId", orderCtrl.updateOrder);
router.delete("/delete-order/:orderId", orderCtrl.deleteOrder);

module.exports = router;

