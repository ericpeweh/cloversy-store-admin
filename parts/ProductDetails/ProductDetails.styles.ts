// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid, Pagination } from "@mui/material";

export const ProductDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	borderRadius: "0.5rem"
});

export const DetailsContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem"
});

export const DetailItem = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	borderRadius: "0.5rem",
	backgroundColor: theme.palette.grey[100],
	border: `1px solid ${theme.palette.grey[100]}`,
	padding: "1.2rem 2rem"
}));

export const DetailTitle = styled("h2")({
	fontSize: "1.6rem",
	fontWeight: 500,
	flex: "0 0 30%",
	position: "relative",
	marginRight: "1rem",
	alignSelf: "flex-start",
	"&::after": {
		content: "':'",
		position: "absolute",
		height: "100%",
		right: 0
	}
});

export const DetailDescription = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	flex: 1
});

export const ReviewsContainer = styled(Grid)({
	marginTop: "2rem"
}) as typeof Grid;

export const ReviewsTitle = styled("h2")({
	fontSize: "1.8rem",
	fontWeight: 500
});

export const ReviewsPagination = styled(Pagination)({
	width: "100%",
	marginTop: "4rem",
	display: "flex",
	justifyContent: "center"
}) as typeof Pagination;
