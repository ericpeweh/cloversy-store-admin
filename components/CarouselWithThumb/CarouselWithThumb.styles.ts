// Dependencies
import { styled } from "@mui/system";
import { Swiper } from "swiper/react";

export const CarouselContainer = styled("div")({
	height: "100%",
	width: "100%"
});

type ImageType = { imageurl: string; size: string };

export const MainCarousel = styled(Swiper)({
	marginBottom: "2rem",
	borderRadius: "0.5rem",
	overflow: "hidden"
}) as typeof Swiper;

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
)<ImageType>(({ imageurl, size }) => ({
	height: size === "small" ? "35rem" : size === "medium" ? "40rem" : "44rem",
	backgroundImage: `url(${imageurl})`
}));

export const ThumbImage = styled(
	ImageBase,
	imagePropsForward
)<ImageType>(({ imageurl, size }) => ({
	height: size === "small" ? "8rem" : size === "medium" ? "10rem" : "12rem",
	backgroundImage: `url(${imageurl})`,
	cursor: "pointer",
	borderRadius: "0.5rem"
}));
