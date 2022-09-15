// Dependencies
import { styled } from "@mui/system";

export const OuterContainer = styled("main")(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	width: "calc(100% - var(--sidebar-width))",
	minHeight: "calc(100vh - var(--header-height))",
	marginLeft: "var(--sidebar-width)",
	padding: "3rem 4rem 5rem",
	[theme.breakpoints.down("lg")]: {
		marginLeft: "0",
		width: "100%",
		padding: "2.5rem 3rem 4rem",
		marginTop: "var(--header-height)"
	},
	[theme.breakpoints.down("md")]: {
		padding: "2.5rem 2.5rem 3rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "2rem 2rem 3rem"
	}
}));
