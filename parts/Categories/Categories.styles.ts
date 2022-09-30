// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const CategoriesContainer = styled("div")({});

export const CategoriesHeader = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		gap: "1rem",
		padding: "1rem"
	}
})) as typeof Grid;

export const CategoriesList = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
