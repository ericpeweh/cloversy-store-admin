// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const OrdersContainer = styled("div")({});

export const OrdersHeader = styled("div")({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between"
}) as typeof Grid;

export const OrdersList = styled("div")({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem"
});
