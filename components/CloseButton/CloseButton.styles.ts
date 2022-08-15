// Dependencies
import { styled } from "@mui/system";

// Components
import { IconButton } from "@mui/material";

export const CloseButtonContainer = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	backgroundColor: theme.palette.grey[200],
	transition: "0.3s ease",
	"&:hover": {
		backgroundColor: theme.palette.grey[300]
	}
})) as typeof IconButton;
