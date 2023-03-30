// Dependencies
import { styled } from "@mui/system";

export const NotFoundContainer = styled("div")({
	minHeight: "80vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: "10rem"
});

export const CodeText = styled("h1")(({ theme }) => ({
	fontSize: "20rem",
	lineHeight: "24rem",
	color: theme.palette.primary.main,
	fontFamily: "var(--font-secondary)",
	[theme.breakpoints.down("xl")]: {
		fontSize: "18rem",
		lineHeight: "22rem"
	},
	[theme.breakpoints.down("lg")]: {
		fontSize: "16rem",
		lineHeight: "20rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "14rem",
		lineHeight: "18rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "12rem",
		lineHeight: "16rem"
	}
}));

export const Message = styled("p")(({ theme }) => ({
	fontSize: "2.4rem",
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	marginBottom: "4rem",
	[theme.breakpoints.down("xl")]: {
		fontSize: "2.2rem"
	},
	[theme.breakpoints.down("lg")]: {
		fontSize: "2rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.8rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));
