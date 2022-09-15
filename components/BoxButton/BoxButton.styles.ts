// Styles
import { styled } from "@mui/system";

// Components
import { ButtonBase } from "@mui/material";

export const BoxButtonContainer = styled(ButtonBase)(({ theme }) => ({
	borderRadius: "0.5rem",
	border: `1px solid ${theme.palette.grey[400]}`,
	padding: "1rem 2rem",
	fontSize: "1.6rem",
	transition: "0.3s ease-in",
	"&:hover": {
		border: `1px solid ${theme.palette.grey[600]}`
	},
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.4rem",
		padding: "0.7rem 1.8rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem",
		padding: "0.5rem 1.5rem"
	}
})) as typeof ButtonBase;
