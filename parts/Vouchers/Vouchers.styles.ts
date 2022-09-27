// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const VouchersContainer = styled("div")({});

export const VouchersHeader = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
})) as typeof Grid;

export const VouchersList = styled("div")(({ theme }) => ({
	padding: "2rem",
	marginTop: "1rem",
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
