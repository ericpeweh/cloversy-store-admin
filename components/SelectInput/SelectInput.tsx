// Dependencies
import { InputLabel, Select, SelectChangeEvent, SelectProps, SxProps } from "@mui/material";
import React from "react";

// Styles
import { SelectInputContainer, SelectMenuItem } from "./SelectInput.styles";

interface SelectInputProps extends SelectProps {
	options: { label: string; value: string }[];
	label?: string;
	value: string | number;
	sx?: SxProps;
}

const SelectInput = ({ options, label, value, sx, onChange, ...props }: SelectInputProps) => {
	return (
		<SelectInputContainer fullWidth>
			{label && <InputLabel id={label}>{label}</InputLabel>}
			<Select
				labelId={label}
				id={label}
				value={value}
				label={label}
				onChange={onChange}
				MenuProps={{ sx: { maxHeight: { xs: "40rem", sm: "20rem" } } }}
				sx={{
					...{
						fontSize: {
							xs: "1.4rem",
							sm: "1.5rem",
							md: "1.6rem"
						},
						"& .MuiSelect-select::placeholder": {
							fontSize: "1.2rem"
						}
					},
					...sx
				}}
				{...props}
			>
				{options.map(({ label, value }) => (
					<SelectMenuItem value={value} key={value}>
						{label}
					</SelectMenuItem>
				))}
			</Select>
		</SelectInputContainer>
	);
};

export default SelectInput;
