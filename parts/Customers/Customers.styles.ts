// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const CustomersContainer = styled("div")({});

export const CustomersHeader = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		gap: "1.5rem",
		padding: "1rem"
	}
})) as typeof Grid;

export const CustomersList = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginTop: "2rem"
});

export const CustomersCardList = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	mr: "-2.4rem",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
