const express = require("express");
const router = express.Router();

const customerCtrl = require("../controllers/customerController.js");
const orderCtrl = require("../controllers/orderController.js"); 

router.post("/register", customerCtrl.registerCustomer);
router.delete("/delete-customer/:customerId", customerCtrl.deleteCustomer);

router.post("/add-order", orderCtrl.addOrder);
router.get("/get-my-orders/:customerId", orderCtrl.getMyOrders); 
router.put("/update-order/:orderId", orderCtrl.updateOrder);
router.delete("/delete-order/:orderId", orderCtrl.deleteOrder);

module.exports = router;
