// Dependencies
import { styled } from "@mui/system";
import { Swiper } from "swiper/react";

export const CarouselContainer = styled("div")({
	height: "100%",
	width: "100%"
});

type ImageType = { imageurl: string; size: string };

export const MainCarousel = styled(Swiper)(({ theme }) => ({
	marginBottom: "2rem",
	borderRadius: "0.5rem",
	overflow: "hidden",
	[theme.breakpoints.down("md")]: {
		marginBottom: "1.3rem"
	},
	[theme.breakpoints.down("sm")]: {
		marginBottom: "0.8rem"
	}
})) as typeof Swiper;

export const ThumbsCarousel = styled(Swiper)({
	position: "relative"
}) as typeof Swiper;

const ImageBase = styled("div")({
	backgroundSize: "cover",
	backgroundPosition: "center"
});

const imagePropsForward = {
	shouldForwardProp: (prop: any) => prop !== "imageurl" && prop !== "size"
};

export const CarouselImage = styled(
	ImageBase,
	imagePropsForward
)<ImageType>(({ imageurl, size, theme }) => ({
	height: size === "small" ? "35rem" : size === "medium" ? "40rem" : "44rem",
	backgroundImage: `url(${imageurl})`,
	[theme.breakpoints.down("xl")]: {
		height: size === "small" ? "26rem" : size === "medium" ? "30rem" : "34rem"
	},
	"@media screen and (max-width: 1100px)": {
		height: size === "small" ? "30rem" : size === "medium" ? "35rem" : "39rem"
	},
	[theme.breakpoints.down("md")]: {
		height: size === "small" ? "32rem" : size === "medium" ? "42rem" : "45rem"
	},
	[theme.breakpoints.down("sm")]: {
		height: size === "small" ? "24rem" : size === "medium" ? "29rem" : "33rem"
	}
}));

export const ThumbImage = styled(
	ImageBase,
	imagePropsForward
)<ImageType>(({ imageurl, size, theme }) => ({
	height: size === "small" ? "8rem" : size === "medium" ? "10rem" : "12rem",
	backgroundImage: `url(${imageurl})`,
	cursor: "pointer",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("xl")]: {
		height: size === "small" ? "6rem" : size === "medium" ? "9rem" : "11rem"
	},
	"@media screen and (max-width: 1100px)": {
		height: size === "small" ? "6.5rem" : size === "medium" ? "8.5rem" : "10.5rem"
	},
	[theme.breakpoints.down("md")]: {
		height: size === "small" ? "8rem" : size === "medium" ? "10rem" : "11rem"
	},
	[theme.breakpoints.down("sm")]: {
		height: size === "small" ? "5.5rem" : size === "medium" ? "7rem" : "8rem"
	}
}));
