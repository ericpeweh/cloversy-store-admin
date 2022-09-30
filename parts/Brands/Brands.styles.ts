// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const BrandsContainer = styled("div")({});

export const BrandsHeader = styled("div")(({ theme }) => ({
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

export const BrandsList = styled("div")(({ theme }) => ({
	padding: "2rem",
	marginTop: "1rem",
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));

export const BrandListItem = styled("div")({
	borderRadius: "0.5rem"
});
