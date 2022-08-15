// Dependencies
import { styled } from "@mui/system";

export const CustomerListCardContainer = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "1fr auto",
	borderRadius: "0.5rem",
	overflow: "hidden",
	position: "relative",
	border: `1px solid ${theme.palette.grey[300]}`,
	boxShadow: "var(--shadow-light)",
	"& > button": {
		gridColumn: "2 / -1",
		gridRow: "2 / 4",
		alignSelf: "center",
		marginRight: "2rem"
	}
}));

interface CustomerImageProps {
	imageUrl: string;
}

export const CustomerImageContainer = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.grey[200],
	height: "9rem",
	position: "relative",
	gridColumn: "1 / -1",
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center"
}));

export const CustomerImage = styled("div", {
	shouldForwardProp: props => props !== "imageUrl"
})<CustomerImageProps>(({ imageUrl }) => ({
	height: "8rem",
	width: "8rem",
	backgroundImage: `url(${imageUrl})`,
	backgroundPosition: "center",
	backgroundSize: "cover",
	cursor: "pointer",
	borderRadius: "50%",
	transform: "translateY(50%)",
	border: "2px solid #fff"
}));

export const CustomerTitle = styled("h2")({
	fontSize: "1.7rem",
	fontWeight: 500,
	cursor: "pointer",
	marginBottom: "0.5rem"
});

export const CustomerText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	width: "max-content",
	marginBottom: "2rem",
	color: theme.palette.grey[500]
}));

export const StatusContainer = styled("div")({
	position: "absolute",
	top: "1rem",
	left: "1rem",
	zIndex: 1
});

export const CustomerContent = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "2rem",
	paddingTop: "6rem"
});
