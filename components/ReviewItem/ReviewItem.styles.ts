// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const ReviewItemContainer = styled(Grid)({}) as typeof Grid;

export const ReviewContainer = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	borderRadius: "0.5rem",
	padding: "2rem"
}));

export const ReviewerName = styled("h5")({
	fontSize: "1.6rem",
	fontWeight: 500
});

export const ReviewDate = styled("p")(({ theme }) => ({
	fontSize: "1.4rem",
	color: theme.palette.grey[500]
}));

export const ReviewDescription = styled("p")({
	fontSize: "1.6rem",
	margin: "2rem 0"
});
