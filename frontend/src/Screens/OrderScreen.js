import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { getOrder } from "../store/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;
	useEffect(() => {
		dispatch(getOrder(params.id));
		// eslint-disable-next-line
	}, [params]);
	const placeOrderHandler = () => {
		dispatch();
	};
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>
									<b>Name:</b> {order.user.name}
								</strong>
							</p>
							<p>
								<strong>
									<b>Email:</b>{" "}
									<a
										style={{ textDecoration: "none" }}
										href={`mailto:${order.user.email}`}
									>
										{order.user.email}
									</a>
								</strong>
							</p>

							<p>
								<strong>
									<b>Address:</b>
								</strong>{" "}
								{order.shippingAddress.address}, {order.shippingAddress.city},{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
                            {order.isDelivered ? (
								<Message variant="success">Delivered At:{order.deliveredAt}</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>
									<b>Method: </b>
								</strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid At:{order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Ordered Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<LinkContainer to={`/product/${item.product}`}>
													<Col md={1}>
														<Image
															src={item.image}
															alt={item.name}
															fluid
															rounded
														/>
													</Col>
												</LinkContainer>
												<Col>
													<Link
														style={{ textDecoration: "none" }}
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price}= ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
