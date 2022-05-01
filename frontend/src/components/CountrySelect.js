import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import countryList from "react-select-country-list";

function CountrySelector({ currentValue, defaultValue }) {
	const [value, setValue] = useState("");
	const options = useMemo(() => countryList().getData(), []);

	const changeHandler = (e) => {
		setValue(e.target.value);
		currentValue(e.target.value);
	};

	return (
		<Form.Select
			aria-label="Default select example"
			defaultValue={defaultValue}
			onChange={changeHandler}
		>
			<option key="default" value="default">
				Select a country
			</option>
			{options.map((opt) => (
				<option key={opt.value} value={opt.label}>
					{opt.label}
				</option>
			))}
		</Form.Select>
	);
}

export default CountrySelector;
