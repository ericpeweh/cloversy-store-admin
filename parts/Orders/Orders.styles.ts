// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const OrdersContainer = styled("div")({});

export const OrdersHeader = styled(Grid)(({ theme }) => ({
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

export const OrdersList = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
