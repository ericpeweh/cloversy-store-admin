// Dependencies
import { styled } from "@mui/system";

export const HeaderContainer = styled("nav")(({ theme }) => ({
	width: `calc(100% - var(--sidebar-width))`,
	marginLeft: "var(--sidebar-width)",
	height: "var(--header-height)",
	backgroundColor: "#fff",
	boxShadow: "var(--shadow-xs)",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
	padding: "0 3rem",
	zIndex: 5,
	[theme.breakpoints.down("lg")]: {
		marginLeft: "0",
		width: "100%",
		position: "fixed",
		top: 0,
		left: 0
	},
	[theme.breakpoints.down("sm")]: {
		padding: "0 2rem"
	}
}));

export const Username = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 400,
	color: theme.palette.grey[500],
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
