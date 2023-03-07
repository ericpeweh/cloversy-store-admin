// Dependencies
import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ReviewContainer = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	borderRadius: "0.5rem",
	padding: "2rem",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem"
	}
})) as typeof Box;

export const ReviewerName = styled("h5")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 500,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const ReviewDate = styled("span")(({ theme }) => ({
	fontSize: "1.4rem",
	color: theme.palette.grey[500],
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const ReviewDescription = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	margin: "2rem 0",
	[theme.breakpoints.down("md")]: {
		margin: "1.5rem 0 ",
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		margin: "1rem 0 ",
		fontSize: "1.4rem"
	}
}));

export const ProductTitle = styled("h3")(({ theme }) => ({
	fontSize: "1.7rem",
	cursor: "pointer",
	fontWeight: 500,
	marginBottom: "0.7rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem",
		marginBottom: "0.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem",
		marginBottom: "0.4rem"
	}
}));
