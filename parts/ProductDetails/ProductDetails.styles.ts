// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid, Pagination } from "@mui/material";

export const ProductDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));

export const DetailsContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem",
	[theme.breakpoints.down("sm")]: {
		gap: "1rem"
	}
}));

export const DetailItem = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	borderRadius: "0.5rem",
	backgroundColor: theme.palette.grey[100],
	border: `1px solid ${theme.palette.grey[100]}`,
	padding: "1.2rem 2rem"
}));

export const DetailTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 500,
	flex: "0 0 30%",
	position: "relative",
	marginRight: "1rem",
	alignSelf: "flex-start",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	},
	"&::after": {
		content: "':'",
		position: "absolute",
		height: "100%",
		right: 0
	}
}));

export const DetailDescription = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	flex: 1,
	whiteSpace: "pre-wrap",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const ReviewsContainer = styled(Grid)({
	marginTop: "2rem"
}) as typeof Grid;

export const ReviewsTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem",
		margin: "0.5rem 0 0 0.5rem"
	}
}));

export const ReviewsPagination = styled(Pagination)(({ theme }) => ({
	width: "100%",
	marginTop: "4rem",
	display: "flex",
	justifyContent: "center",
	[theme.breakpoints.down("sm")]: {
		marginTop: "3rem"
	}
})) as typeof Pagination;
