// Dependencies
import { styled } from "@mui/system";

export const OrderDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-xs)"
});

// Order product details
interface CustomerImageProps {
	imageUrl: string;
}

export const CustomerImage = styled("div", {
	shouldForwardProp: props => props !== "imageUrl"
})<CustomerImageProps>(({ imageUrl }) => ({
	height: "4rem",
	width: "4rem",
	backgroundImage: `url(${imageUrl})`,
	backgroundPosition: "center",
	backgroundSize: "cover",
	cursor: "pointer",
	borderRadius: "50%",
	border: "2px solid #fff"
}));

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

// Section
export const Section = styled("div")({
	marginBottom: "3rem"
});

export const SectionTitle = styled("h2")({
	fontSize: "1.8rem",
	fontWeight: 500,
	marginBottom: "0.5rem"
});

// Address
export const AddressContainer = styled("div")(({ theme }) => ({
	padding: "2rem",
	borderRadius: "0.5rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	background: theme.palette.grey[100]
}));

export const AddressContent = styled("div")({
	display: "flex",
	flexDirection: "column"
});

export const AddressInfo = styled("div")({});

export const AddressLabel = styled("h2")({
	fontSize: "1.8rem",
	fontFamily: "var(--font-secondary)",
	fontWeight: 500,
	display: "flex",
	gap: "1rem",
	marginBottom: "1rem"
});

export const RecipientName = styled("h3")({
	fontSize: "1.7rem"
});

export const AddressText = styled("p")({
	fontSize: "1.6rem"
});

// Last seen
export const CardItemContainer = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "1rem",
	background: theme.palette.grey[100],
	borderRadius: "0.5rem",
	padding: "1rem",
	alignItems: "center",
	"& > button": {
		marginLeft: "auto"
	}
}));

interface CardItemImageProps {
	imageUrl?: string;
}

export const CardItemImage = styled("div", {
	shouldForwardProp: props => props !== "imageUrl"
})<CardItemImageProps>(({ imageUrl, theme }) => ({
	width: "8rem",
	height: "6rem",
	borderRadius: "0.5rem",
	backgroundImage: imageUrl
		? `url(${imageUrl})`
		: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
	color: "#fff",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundPosition: "center",
	backgroundSize: "cover",
	cursor: "pointer"
}));

export const CardTitle = styled("h3")({
	fontSize: "1.6rem",
	fontWeight: 500
});

export const CardSubtitle = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	fontWeight: 400,
	color: theme.palette.grey[500]
}));
