// Dependencies
import React from "react";
import { BaseTextFieldProps } from "@mui/material";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

// Styles
import { TextInputContainer } from "./TextInput.styles";

interface TextInputProps extends BaseTextFieldProps {
	label: string;
	variant?: "outlined" | "standard" | "filled" | undefined;
	placeholder?: string;
	multiline?: boolean;
	rows?: number;
	type?: string;
	size?: "small" | "medium" | undefined;
	value: string | number;
	name?: string;
	onChange: Function;
}

const TextInput = ({
	label,
	variant = "outlined",
	placeholder,
	multiline,
	rows,
	type = "text",
	value,
	onChange,
	name,
	...props
}: TextInputProps) => {
	const { wWidth } = useWindowSize();

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	return (
		<TextInputContainer
			label={label}
			variant={variant}
			fullWidth
			placeholder={placeholder}
			autoComplete="off"
			multiline={multiline}
			rows={rows}
			type={type}
			size={wWidth <= 600 ? "small" : "medium"}
			value={value}
			name={name}
			onChange={inputChangeHandler}
			{...props}
		/>
	);
};

export default TextInput;
