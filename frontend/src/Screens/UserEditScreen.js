import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userProfile, updateUser } from "../store/actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../store/actions/actionTypes";


const UserEditScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const dispatch = useDispatch();
	
	const userDetails = useSelector((state) => state.userDetails);
	const userUpdate = useSelector((state) => state.userUpdate);
	const { user, loading, error } = userDetails;
	const { success, loading: updateLoading, error: updateError } = userUpdate;
	const params = useParams();
	const history = useNavigate();

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_RESET });
			history("/admin/userlist");
		} else {
			if (!user.name || user._id !== params.id) {
				dispatch(userProfile(params.id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, params, user, history, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: params.id, name, email, isAdmin }));
	};
	return (
		<>
			<Link className="btn btn-light my-3" to="/admin/userlist">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{updateLoading && <Loader />}
				{updateError && <Message variant="danger">{updateError}</Message>}
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
						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group className="mt-2" controlId="isAdmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
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

export default UserEditScreen;
