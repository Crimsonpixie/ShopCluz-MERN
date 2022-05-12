import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../store/actions/productListActions";
import {
	deleteProduct,
	createProduct,
} from "../store/actions/productDetailsActions";
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DETAILS_RESET,
} from "../store/actions/actionTypes";

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const productList = useSelector((state) => state.productList);
	const userLogin = useSelector((state) => state.userLogin);
	const productDelete = useSelector((state) => state.productDelete);
	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;
	const { userInfo } = userLogin;
	const { loading, error, products } = productList;
	const {
		error: errorDelete,
		loading: loadingDelete,
		success: successDelete,
	} = productDelete;
	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history("/login");
		}
		if (successCreate) {
			history(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts());
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
	]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(id));
		}
	};
	const createProductHandler = () => {
		dispatch(createProduct());
	};
	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col style={{ textAlign: "right" }}>
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i>Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button
											onClick={() => dispatch({ type: PRODUCT_DETAILS_RESET })}
											variant="light"
											className="btn-sm"
										>
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(product._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListScreen;
