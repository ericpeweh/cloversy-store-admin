// Styles
import { QuantityButton, QuantityInputContainer, QuantityInputField } from "./QuantityInput.styles";

interface QuantityInputProps {
	value: number;
	size?: "small" | "medium";
}

const QuantityInput = ({ value, size = "small", ...props }: QuantityInputProps) => {
	const buttonSize = size === "small" ? "3rem" : "3.5rem";
	const buttonProps = {
		minWidth: buttonSize,
		height: buttonSize,
		backgroundColor: "secondary.light"
	};

	return (
		<QuantityInputContainer>
			<QuantityButton variant="contained" sx={{ ...buttonProps, mr: "-2px" }}>
				-
			</QuantityButton>
			<QuantityInputField type="number" value={value} />
			<QuantityButton variant="contained" sx={{ ...buttonProps, ml: "-2px" }}>
				+
			</QuantityButton>
		</QuantityInputContainer>
	);
};

export default QuantityInput;
