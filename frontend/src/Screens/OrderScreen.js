import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import {
	getOrder,
	payOrderAction,
	deliverOrderAction,
} from "../store/actions/orderActions";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../store/actions/actionTypes";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
	const [sdkReady, setSdkReady] = useState(false);
	const params = useParams();
	const dispatch = useDispatch();
	const history = useNavigate();
	const orderDetails = useSelector((state) => state.orderDetails);
	const userLogin = useSelector((state) => state.userLogin);
	const payOrder = useSelector((state) => state.payOrder);
	const deliverOrder = useSelector((state) => state.deliverOrder);
	const { loading: loadingPay, success: successPay } = payOrder;
	const { loading: loadingDeliver, success: successDeliver } = deliverOrder;
	const { order, loading, error } = orderDetails;
	const { userInfo } = userLogin;
	useEffect(() => {
		if (!userInfo) {
			history("/login");
		}
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!Object.keys(order).length || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrder(params.id));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
		// eslint-disable-next-line
	}, [dispatch, params, successPay, order, userInfo, successDeliver]);

	const deliverHandler = () => {
		dispatch(deliverOrderAction(params.id));
	};

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrderAction(params.id, paymentResult));
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
								<Message variant="success">
									Delivered on: {order.deliveredAt}
								</Message>
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
								<Message variant="success">Paid on {order.paidAt}</Message>
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
													{item.qty} x ${item.price}= $
													{(item.qty * item.price).toFixed(2)}
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
							{!order.isPaid && !userInfo.isAdmin && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type="button"
											className="btn btn-block"
											style={{ width: "100%" }}
											onClick={deliverHandler}
										>
											Mark as Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
