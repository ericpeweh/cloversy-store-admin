// Dependencies
import { styled } from "@mui/system";

// Components
import { Dialog } from "@mui/material";

export const ConfirmationModalContainer = styled(Dialog)({
	"& .MuiDialog-paper": {
		minHeight: "20rem",
		minWidth: "30rem",
		padding: " 1.5rem"
	}
}) as typeof Dialog;
