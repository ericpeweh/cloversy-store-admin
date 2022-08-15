// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const CustomerListItemContainer = styled(Grid)({
	padding: "1.5rem 2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem"
}) as typeof Grid;

export const CustomerImage = styled("div")({
	width: "6rem",
	height: "6rem",
	borderRadius: "50%",
	overflow: "hidden"
});

export const CustomerTitle = styled("h2")({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginLeft: "1rem"
});

export const CustomerText = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content"
});
