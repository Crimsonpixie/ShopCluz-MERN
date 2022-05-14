import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import productRoutes from "./routes/ProductRouter.js";
import userRoutes from "./routes/userRouter.js";
import orderRoutes from "./routes/orderRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";
import { notFound, errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
//This routing handler is above the middleware to avoid collision with the below middleware
app.use("/api/products", productRoutes); //Routing level middleware
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}

app.use(notFound);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
