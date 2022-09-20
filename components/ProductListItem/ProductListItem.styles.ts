// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const ProductListItemContainer = styled(Grid)({
	padding: "1.5rem 2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-light)",
	marginBottom: "1rem",
	"@media screen and (max-width: 700px)": {
		marginBottom: "1.5rem"
	}
}) as typeof Grid;

export const ProductImage = styled("div")({
	width: "6rem",
	height: "6rem",
	borderRadius: "0.5rem",
	overflow: "hidden"
});

export const ProductTitle = styled("h2")(({ theme }) => ({
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

export const ProductText = styled("p")(({ theme }) => ({
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
