// Dependencies
import { styled } from "@mui/system";

// Components
import { LoadingButton } from "@mui/lab";

export const CustomButton = styled(LoadingButton)(({ theme, ...props }) => ({
	fontSize: props.size === "large" ? "1.7rem" : "1.5rem",
	padding: props.size === "large" ? "1rem 2.8rem" : "0.6rem 2rem",
	fontFamily: "var(--font-secondary)",
	[theme.breakpoints.down("lg")]: {
		fontSize: props.size === "large" ? "1.5rem" : "1.4rem",
		padding: props.size === "large" ? "0.8rem 2.4rem" : "0.5rem 1.8rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: props.size === "large" ? "1.4rem" : "1.3rem",
		padding: props.size === "large" ? "0.6rem 2rem" : "0.4rem 1.5rem"
	}
})) as typeof LoadingButton;
