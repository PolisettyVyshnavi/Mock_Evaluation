import { Router } from 'express';
const router=Router();
import { registerCustomer, deleteCustomer } from "../controllers/customerController";
import { addOrder, getCustomerOrders, updateOrder, deleteOrder } from "../controllers/orderController";
import { validateCustomer, validateOrder } from "../validation/middleware";

router.post('/register',validateCustomer, registerCustomer);
router.delete('/delete-customer/:customerId', deleteCustomer);

router.post('/add-order',validateOrder, addOrder);
router.get('/get-my-orders/:customerId', getCustomerOrders);
router.put('/update-order/:orderId',updateOrder);
router.delete('/delete-order/:orderId',deleteOrder)




