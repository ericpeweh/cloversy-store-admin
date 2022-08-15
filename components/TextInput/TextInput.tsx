// Dependencies
import React from "react";

// Styles
import { TextInputContainer } from "./TextInput.styles";

interface TextInputProps {
	label: string;
	id: string;
	variant?: "outlined" | "standard" | "filled" | undefined;
	placeholder?: string;
	multiline?: boolean;
	rows?: number;
	type?: string;
	size?: "small" | "medium" | undefined;
}

const TextInput = ({
	label,
	id,
	variant = "outlined",
	placeholder,
	multiline,
	rows,
	type = "text",
	size = "medium"
}: TextInputProps) => {
	return (
		<TextInputContainer
			id={id}
			label={label}
			variant={variant}
			fullWidth
			placeholder={placeholder}
			autoComplete="off"
			multiline={multiline}
			rows={rows}
			type={type}
			size={size}
		/>
	);
};

export default TextInput;
