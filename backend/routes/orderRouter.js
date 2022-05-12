import express from "express";
import {
	addOrderDetails,
	getOrderById,
	updateOrdertoPaid,
	getMyOrders,
	getAllOrders,
	updateOrdertoDelivered,
} from "../controllers/orderController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, addOrderDetails)
	.get(protect, adminAuth, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, adminAuth, updateOrdertoDelivered);
export default router;
