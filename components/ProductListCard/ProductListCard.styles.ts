// Dependencies
import { styled } from "@mui/system";

export const ProductListCardContainer = styled("div")({
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
		marginRight: "2rem"
	}
});

interface ProductImageProps {
	imageUrl: string;
}

export const ProductImage = styled("div", {
	shouldForwardProp: props => props !== "imageUrl"
})<ProductImageProps>(({ imageUrl }) => ({
	height: "20rem",
	backgroundImage: `url(${imageUrl})`,
	backgroundPosition: "center",
	backgroundSize: "cover",
	gridColumn: "1 / -1",
	cursor: "pointer"
}));

export const ProductTitle = styled("h2")({
	fontSize: "1.7rem",
	fontWeight: 500,
	margin: "2rem 0 0.5rem 2rem",
	cursor: "pointer"
});

export const ProductText = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content",
	margin: "0 0 2rem 2rem"
});

export const StatusContainer = styled("div")({
	position: "absolute",
	top: "1rem",
	left: "1rem"
});
