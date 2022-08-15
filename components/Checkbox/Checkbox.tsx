// Dependencies
import { Checkbox as MuiCheckbox } from "@mui/material";
import React from "react";

// Styles
import { CheckboxContainer, CheckboxLabel } from "./Checkbox.styles";

interface CheckboxProps {
	label: string | React.ReactElement;
	checked: boolean;
	onChange: (value: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
	const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	return (
		<CheckboxContainer>
			<CheckboxLabel
				label={label}
				control={<MuiCheckbox checked={checked} onChange={checkboxChangeHandler} />}
			/>
		</CheckboxContainer>
	);
};

export default Checkbox;
