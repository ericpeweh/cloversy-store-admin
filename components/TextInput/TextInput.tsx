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
}

const TextInput = ({
	label,
	id,
	variant = "outlined",
	placeholder,
	multiline,
	rows,
	type = "text"
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
		/>
	);
};

export default TextInput;
