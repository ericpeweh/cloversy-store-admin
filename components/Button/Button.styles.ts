// Dependencies
import { styled } from "@mui/system";

// Components
import { Button } from "@mui/material";

export const CustomButton = styled(Button)(({ theme, ...props }) => ({
	fontSize: props.size === "large" ? "1.7rem" : "1.5rem",
	padding: props.size === "large" ? "1rem 2.8rem" : "0.6rem 2rem",
	fontFamily: "var(--font-secondary)"
})) as typeof Button;
