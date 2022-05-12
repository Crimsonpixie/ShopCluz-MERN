import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateProduct } from "../store/actions/productDetailsActions";
import FormContainer from "../components/FormContainer";
import { productDetailsAction } from "../store/actions/productDetailsActions";
import { PRODUCT_UPDATE_RESET } from "../store/actions/actionTypes";

const ProductEditScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);
	console.log(image);
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading, error, product } = productDetails;
	const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;
	const params = useParams();
	const history = useNavigate();

	useEffect(() => {
		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history("/admin/productlist");
		} else {
			if (!product || product._id !== params.id) {
				dispatch(productDetailsAction(params.id));
			} else {
				setName(product.name);
				setPrice(product.price);
				setDescription(product.description);
				setImage(product.image);
				setCategory(product.category);
				setBrand(product.brand);
				setCountInStock(product.countInStock);
			}
		}
	}, [dispatch, params, history, success, product]);

	const uploadImageHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: params.id,
				name,
				price,
				description,
				brand,
				category,
				countInStock,
				image,
			})
		);
	};
	return (
		<>
			<Link className="btn btn-light my-3" to="/admin/productlist">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.Control type="file" onChange={uploadImageHandler} />
							{uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter stock count"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary" className="my-3">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
