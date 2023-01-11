// Dependencies
import { styled } from "@mui/system";
import { Card, CardContent, CardMedia, Snackbar } from "@mui/material";

export const CustomSnackbar = styled(Snackbar)(({ theme }) => ({})) as typeof Snackbar;

export const CardComponent = styled(Card)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	borderRadius: "0.5rem",
	border: `1px solid ${theme.palette.grey[200]}`,
	boxShadow: "var(--shadow-light)",
	width: "48rem",
	[theme.breakpoints.down("sm")]: {
		width: "100%"
	}
})) as typeof Card;

export const CardWrapper = styled(CardContent)({
	display: "flex",
	flexDirection: "column",
	padding: "2.5rem 2rem 2rem !important"
}) as typeof CardContent;

export const CardImageContainer = styled("div")({
	height: "6rem"
});

export const CardImage = styled(CardMedia)(({ theme }) => ({
	cursor: "pointer",
	borderRadius: "0.5rem",
	height: "100%",
	width: "6rem",
	border: `1px solid ${theme.palette.grey[300]}`
})) as typeof CardMedia;

export const Title = styled("h4")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 500,
	marginBottom: "2rem",
	textTransform: "uppercase",
	letterSpacing: "2px",
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem",
		marginBottom: "1.5rem"
	}
}));

export const NotificationText = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 400,
	color: theme.palette.grey[600],
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));
