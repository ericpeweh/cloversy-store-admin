// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const ProductsContainer = styled("div")({});

export const ProductsHeader = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between",
	"@media screen and (max-width: 1480px)": {
		flexDirection: "column",
		gap: "1rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
})) as typeof Grid;

export const ProductsList = styled("div")({
	display: "flex",
	flexDirection: "column"
});

export const ProductsCardList = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
