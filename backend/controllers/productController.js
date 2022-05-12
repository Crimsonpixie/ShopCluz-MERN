import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed successfully" });
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		description: "Sample description",
		countInStock: 0,
		numReviews: 0,
	});
	const newProduct = await product.save();
	res.status(201).json(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.category = category;
		product.brand = brand;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

export { getProducts, getProductById, deleteProduct, createProduct,updateProduct};
