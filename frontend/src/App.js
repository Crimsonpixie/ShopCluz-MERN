import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = function () {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<HomeScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart">
							<Route path=":id" element={<CartScreen />} />
							<Route path="" element={<CartScreen />} />
						</Route>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
