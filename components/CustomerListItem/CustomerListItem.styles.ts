// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const CustomerListItemContainer = styled(Grid)({
	padding: "1.5rem 2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-light)",
	marginBottom: "1rem",
	"@media screen and (max-width: 700px)": {
		marginBottom: "1.5rem"
	}
}) as typeof Grid;

export const CustomerImage = styled("div")({
	width: "6rem",
	height: "6rem",
	borderRadius: "50%",
	overflow: "hidden"
});

export const CustomerTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginLeft: "1rem",
	cursor: "pointer",
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const CustomerText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));
