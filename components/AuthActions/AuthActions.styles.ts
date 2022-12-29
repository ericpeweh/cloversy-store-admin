// Dependencies
import { styled } from "@mui/system";

export const AuthActionsContainer = styled("div")({
	height: "100vh",
	width: "100%",
	position: "fixed",
	top: 0,
	left: 0,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1000,
	backgroundColor: "#fff",
	fontFamily: "var(--font-secondary)"
});

export const InformationText = styled("h1", {
	shouldForwardProp: props => props !== "color"
})<{ color?: "secondary" | "error" }>(({ theme, color = "secondary" }) => ({
	fontWeight: 400,
	color: color === "error" ? theme.palette.error.light : theme.palette.secondary.main,
	fontSize: "2.6rem",
	marginBottom: "2rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "2.4rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "2.2rem"
	}
}));

export const LogoContainer = styled("div")(({ theme }) => ({
	width: "15rem",
	marginBottom: "4rem",
	[theme.breakpoints.down("md")]: {
		width: "13rem",
		marginBottom: "3rem"
	},
	[theme.breakpoints.down("sm")]: {
		width: "11rem",
		marginBottom: "2rem"
	}
}));
