// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const ProductListItemContainer = styled(Grid)({
	padding: "1.5rem 2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem"
}) as typeof Grid;

export const ProductImage = styled("div")({
	width: "6rem",
	height: "6rem",
	borderRadius: "0.5rem",
	overflow: "hidden"
});

export const ProductTitle = styled("h2")({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginLeft: "1rem"
});

export const ProductText = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content"
});
