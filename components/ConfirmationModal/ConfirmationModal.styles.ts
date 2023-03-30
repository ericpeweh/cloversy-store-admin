// Dependencies
import { styled } from "@mui/system";

// Components
import { Dialog } from "@mui/material";

export const ConfirmationModalContainer = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paper": {
		minHeight: "20rem",
		minWidth: "30rem",
		padding: " 1.5rem",
		[theme.breakpoints.down("lg")]: {
			padding: " 1rem"
		}
	}
})) as typeof Dialog;
