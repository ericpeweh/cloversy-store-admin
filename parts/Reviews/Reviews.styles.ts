// Dependencies
import { styled } from "@mui/system";

export const ReviewsContainer = styled("div")({});

export const ReviewsHeader = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	margin: "1rem 0",
	padding: "2rem",
	display: "flex",
	justifyContent: "space-between",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		gap: "1rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));

export const ReviewsList = styled("div")(({ theme }) => ({
	padding: "2rem",
	marginTop: "1rem",
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));
