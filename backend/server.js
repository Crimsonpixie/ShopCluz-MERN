import express from "express";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
import productRoutes from "./routes/ProductRouter.js";
import userRoutes from "./routes/userRouter.js";
import { notFound, errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
	res.send("API is running...");
});
app.use(express.json());
//This routing handler is above the middleware to avoid collision with the below middleware
app.use("/api/products", productRoutes); //Routing level middleware
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
