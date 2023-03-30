// Dependencies
import { styled } from "@mui/system";

export const CustomerDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-xs)",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem 1.2rem"
	}
}));

// Section
export const Section = styled("div")({
	marginBottom: "3rem"
});

export const SectionTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	marginBottom: "1rem",
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.8rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));

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
	marginRight: "1rem",
	backgroundImage: imageUrl
		? `url(${imageUrl})`
		: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
	color: "#fff",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundPosition: "center",
	backgroundSize: "cover",
	cursor: "pointer",
	[theme.breakpoints.down("sm")]: {
		width: "7rem"
	}
}));

export const CardTitle = styled("h3")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 500,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const CardSubtitle = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	fontWeight: 400,
	color: theme.palette.grey[500],
	[theme.breakpoints.down("md")]: {
		fontSize: "1.4rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));
