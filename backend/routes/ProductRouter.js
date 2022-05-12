import express from "express";
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct
} from "../controllers/productController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAuth, createProduct);
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, adminAuth, deleteProduct).put(protect,adminAuth,updateProduct);
export default router;
