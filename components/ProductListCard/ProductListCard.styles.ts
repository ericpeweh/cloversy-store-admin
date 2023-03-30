// Dependencies
import { styled } from "@mui/system";

export const ProductListCardContainer = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "1fr auto",
	borderRadius: "0.5rem",
	overflow: "hidden",
	position: "relative",
	boxShadow: "var(--shadow-light)",
	"& > button": {
		gridColumn: "2 / -1",
		gridRow: "2 / 4",
		alignSelf: "center",
		marginRight: "2rem",
		[theme.breakpoints.down("sm")]: {
			gridColumn: "1 / -1",
			gridRow: "4 / 5",
			marginRight: "0"
		}
	}
}));

interface ProductImageProps {
	imageUrl: string;
}

export const ProductImage = styled("div", {
	shouldForwardProp: props => props !== "imageUrl"
})<ProductImageProps>(({ imageUrl, theme }) => ({
	height: "20rem",
	backgroundImage: `url(${imageUrl})`,
	backgroundPosition: "center",
	backgroundSize: "cover",
	gridColumn: "1 / -1",
	cursor: "pointer",
	[theme.breakpoints.down("xl")]: {
		height: "17rem"
	},
	[theme.breakpoints.down("lg")]: {
		height: "14rem"
	},
	[theme.breakpoints.down("md")]: {
		height: "12rem"
	},
	[theme.breakpoints.down("sm")]: {
		height: "10rem"
	}
}));

export const ProductTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 500,
	margin: "2rem 0 0.5rem 2rem",
	cursor: "pointer",
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem",
		gridColumn: "1 / -1"
	}
}));

export const ProductText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content",
	margin: "0 0 2rem 2rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const StatusContainer = styled("div")({
	position: "absolute",
	top: "1rem",
	left: "1rem"
});
