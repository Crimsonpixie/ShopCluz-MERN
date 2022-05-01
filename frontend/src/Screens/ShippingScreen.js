import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { addShippingAddress } from "../store/actions/cartActions";
import FormContainer from "../components/FormContainer";
import CountrySelector from "../components/CountrySelect";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const dispatch = useDispatch();
	const history = useNavigate();
	console.log(country);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addShippingAddress({ address, city, postalCode, country }));
		history("/payment");
	};
	return (
		<FormContainer>
            <CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<CountrySelector currentValue={setCountry} defaultValue={country} />
				</Form.Group>
				<Button type="submit" variant="primary" className="my-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
