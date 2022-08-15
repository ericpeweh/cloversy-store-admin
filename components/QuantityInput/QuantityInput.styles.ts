// Dependencies
import { styled } from "@mui/system";

// Components
import { Button } from "@mui/material";

export const QuantityInputContainer = styled("div")({
	display: "flex",
	justifyContent: "center"
});

export const QuantityInputField = styled("input")(({ theme }) => ({
	border: "none",
	fontSize: "1.6rem",
	width: "6rem",
	outline: "none",
	textAlign: "center",
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: theme.palette.grey[400],
	"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
		"-webkit-appearance": "none",
		"-moz-appearance": "textfield"
	}
}));

export const QuantityButton = styled(Button)(({ theme }) => ({
	fontSize: "2rem",
	border: "none",
	overflow: "hidden",
	cursor: "pointer",
	transition: "0.3s ease",
	padding: "0"
})) as typeof Button;
