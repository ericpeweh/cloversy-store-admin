// Dependencies
import { InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import React from "react";

// Styles
import { SelectInputContainer } from "./SelectInput.styles";

interface SelectInputProps extends SelectProps {
	options: string[];
	label?: string;
	value: string | number;
}

const SelectInput = ({ options, label, value, ...props }: SelectInputProps) => {
	return (
		<SelectInputContainer fullWidth>
			{label && <InputLabel id={label}>{label}</InputLabel>}
			<Select
				labelId={label}
				id={label}
				value={value}
				label={label}
				onChange={() => {}}
				{...props}
				MenuProps={{ sx: { maxHeight: "20rem" } }}
			>
				{options.map(option => (
					<MenuItem value={option} key={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</SelectInputContainer>
	);
};

export default SelectInput;
