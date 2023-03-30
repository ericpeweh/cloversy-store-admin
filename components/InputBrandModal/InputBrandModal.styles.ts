// Dependencies
import { styled } from "@mui/system";

// Components
import { Dialog, Grid } from "@mui/material";

export const InputBrandModalContainer = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paper": {
		maxHeight: "60vh",
		minWidth: "42vw",
		padding: "3rem 0 0 3rem",
		[theme.breakpoints.down("sm")]: {
			padding: "2rem 0 0 2rem",
			maxHeight: "80vh"
		}
	}
})) as typeof Dialog;

export const ModalTitle = styled("h2")(({ theme }) => ({
	fontSize: "2.2rem",
	marginBottom: "1rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.9rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.7rem"
	}
}));

export const FormContainer = styled("form")({
	display: "flex",
	flexDirection: "column",
	overflow: "auto",
	padding: "2rem 2rem 2rem 0"
});

export const InputContainer = styled(Grid)({
	position: "relative"
}) as typeof Grid;
