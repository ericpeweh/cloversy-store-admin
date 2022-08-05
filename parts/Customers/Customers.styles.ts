// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const CustomersContainer = styled("div")({});

export const CustomersHeader = styled("div")({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between"
}) as typeof Grid;

export const CustomersList = styled("div")({
	display: "flex",
	flexDirection: "column"
});

export const CustomersCardList = styled("div")({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	mr: "-2.4rem"
});
