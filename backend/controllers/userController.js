import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	const existsUser = await User.findOne({ email });
	if (existsUser) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({ name, email, password });
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateWebToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
};
const getUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
};

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateWebToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

export { authUser, getUserProfile, registerUser };
