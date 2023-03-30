// Dependencies
import { styled } from "@mui/system";

export const ChattingHeaderContainer = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "2rem",
	alignItems: "center",
	backgroundColor: theme.palette.grey[100],
	borderRadius: "0.5rem 0.5rem 0 0",
	padding: "1rem",
	[theme.breakpoints.down("sm")]: {
		gap: "1.5rem"
	}
}));

export const ChattingHeader = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "2rem",
	height: "9rem",
	alignItems: "center",
	backgroundColor: theme.palette.grey[200],
	borderRadius: "0.5rem 0.5rem 0 0",
	padding: "1rem",
	border: `1px solid ${theme.palette.grey[300]}`,
	[theme.breakpoints.down("sm")]: {
		gap: "1.5rem"
	}
}));

export const NameContainer = styled("div")({});

export const Name = styled("h3")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const ContactDetail = styled("p")(({ theme }) => ({
	fontSize: "1.4rem",
	fontWeight: 400,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.3rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.2rem"
	}
}));
