// Dependencies
import { styled } from "@mui/system";

export const OrderCardContainer = styled("div")(({ theme }) => ({
	borderRadius: "0.5rem",
	padding: "1rem",
	paddingLeft: 0,
	display: "flex",
	gap: "2rem",
	justifyContent: "space-between",
	[theme.breakpoints.down("sm")]: {
		gap: "1rem",
		paddingLeft: "1rem"
	}
}));

type CarouselImageType = { imageurl: string; clickable: boolean };

export const CardImage = styled("div", {
	shouldForwardProp: prop => prop !== "imageurl" && prop !== "clickable"
})<CarouselImageType>(({ imageurl, clickable, theme }) => ({
	flex: "0 0 auto",
	cursor: clickable ? "pointer" : "default",
	backgroundImage: `url(${imageurl})`,
	backgroundSize: "cover",
	backgroundPosition: "center",
	borderRadius: "0.5rem",
	height: "9rem",
	width: "11rem",
	[theme.breakpoints.down("md")]: {
		height: "7rem",
		width: "12rem"
	},
	[theme.breakpoints.down("sm")]: {
		height: "7rem",
		width: "8rem"
	}
}));

export const CardContent = styled("div")({
	display: "flex",
	flexDirection: "column",
	width: "max-content",
	marginRight: "auto"
});

type CardTitleType = { clickable: boolean };

export const CardTitle = styled("h3", {
	shouldForwardProp: prop => prop !== "clickable"
})<CardTitleType>(({ theme, clickable }) => ({
	fontSize: "1.7rem",
	cursor: clickable ? "pointer" : "default",
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

export const CardDescription = styled("p")(({ theme }) => ({
	color: theme.palette.grey[500],
	fontSize: "1.5rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.4rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const CardQuantity = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.4rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const CardPrice = styled("p")(({ theme }) => ({
	fontSize: "1.8rem",
	color: theme.palette.primary.main,
	alignSelf: "center",
	fontWeight: 500,
	textAlign: "right",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));
