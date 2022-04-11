import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import colors from "colors";

dotenv.config();
connectDB();

const importData = async () => {
	try {
		//Remove all the documents in the models
		await Product.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		//Add the data in the models
		const sampleUsers = await User.insertMany(users);
		const adminUser = sampleUsers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user:adminUser };
		});
		await Product.insertMany(sampleProducts);
		console.log("Data Imported!".green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		//Remove all the documents in the models
		await Product.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		console.log("Data Destroyed!".red.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if(process.argv[2]==="-d"){
  destroyData();  
}
else{
  importData();  
}