import jwt from "jsonwebtoken";

const generateWebToken = (id) => {
	return jwt.sign({ id }, process.env.JSON_SECRET_KEY, { expiresIn: "30d" });
};

export default generateWebToken;