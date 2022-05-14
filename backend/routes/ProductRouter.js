import express from "express";
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	addReviews,
	getTopProducts,
} from "../controllers/productController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAuth, createProduct);
router.route("/top").get(getTopProducts);
router
.route("/:id")
.get(getProductById)
.delete(protect, adminAuth, deleteProduct)
.put(protect, adminAuth, updateProduct);

router.route("/:id/reviews").post(protect, addReviews);

export default router;
