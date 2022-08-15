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
	}
})) as typeof ButtonBase;
