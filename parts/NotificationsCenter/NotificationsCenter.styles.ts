// Dependencies
import { styled } from "@mui/system";

export const NotificationsCenterContainer = styled("div")({});

export const Section = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	height: "100%",
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem"
	}
}));

export const ListContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	marginTop: "1rem",
	[theme.breakpoints.down("md")]: {
		gap: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		gap: "1rem"
	}
}));

export const ListItem = styled("div")(({ theme }) => ({
	display: "flex",
	backgroundColor: theme.palette.grey[100],
	border: `1px solid ${theme.palette.grey[100]}`,
	padding: "1.2rem 2rem",
	borderRadius: "0.5rem",
	justifyContent: "space-between",
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem 1.5rem"
	}
}));

export const ListItemTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	marginBottom: "0.8rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));

export const ListItemText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	color: theme.palette.grey[600],
	display: "flex",
	gap: "0.5rem",
	alignItems: "center",
	marginBottom: "0.8rem",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));
