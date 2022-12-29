// Dependencies
import React, { useEffect, useState } from "react";
import { BaseTextFieldProps } from "@mui/material";

// Hooks
import { useField } from "formik";
import useWindowSize from "../../hooks/useWindowSize";
import useUpdateField from "../../hooks/useUpdateField";

// Styles
import { InputLimitText, TextInputContainer } from "./PerformantTextInput.styles";

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
	maxLength?: number;
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
	onBlur,
	maxLength,
	name,
	...props
}: TextInputProps) => {
	const [field, meta] = useField(name || "");
	const [fieldValue, setFieldValue] = useState(field.value);
	const { wWidth } = useWindowSize();

	// Propagate
	useUpdateField({ setFieldValue, name: name || "", value: field.value });

	useEffect(() => {
		if (meta.touched) {
			return;
		}

		if (field.value !== fieldValue) {
			setFieldValue(field.value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field.value]);

	const onChangePerformant = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(maxLength ? event.target.value.slice(0, maxLength) : event.target.value);
	};

	const onBlurPerformant = (event: React.FocusEvent<HTMLInputElement>) => {
		const value = event.target.value || "";
		window.setTimeout(() => {
			field.onChange({
				target: {
					name,
					value: type === "number" ? parseInt(value, 10) : value
				}
			});
		}, 0);
		window.setTimeout(() => {
			field.onBlur(event);
		}, 200);
	};

	return (
		<>
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
				value={fieldValue}
				name={name}
				onChange={onChangePerformant}
				onBlur={onBlurPerformant}
				{...props}
			/>
			{maxLength && (
				<InputLimitText>
					{fieldValue.length}/{maxLength}
				</InputLimitText>
			)}
		</>
	);
};

export default TextInput;
