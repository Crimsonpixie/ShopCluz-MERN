import express from "express";
import {
	authUser,
	getUserProfile,
	registerUser,
	updateProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from "../controllers/userController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, adminAuth, getUsers);

router.route("/login").post(authUser);

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateProfile);

router
	.route("/:id")
	.delete(protect, adminAuth, deleteUser)
	.get(protect, adminAuth, getUserById)
	.put(protect, adminAuth, updateUser);

export default router;
