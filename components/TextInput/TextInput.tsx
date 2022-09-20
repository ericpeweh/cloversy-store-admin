// Dependencies
import React from "react";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

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
	...props
}: TextInputProps) => {
	const { wWidth } = useWindowSize();

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
			size={wWidth <= 600 ? "small" : "medium"}
			{...props}
		/>
	);
};

export default TextInput;
