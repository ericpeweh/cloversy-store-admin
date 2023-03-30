// Dependencies
import React, { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Navigation, SwiperOptions, Thumbs } from "swiper";

// Styles
import {
	CarouselContainer,
	CarouselImage,
	MainCarousel,
	ThumbImage,
	ThumbsCarousel
} from "./CarouselWithThumb.styles";

// Components
import { SwiperSlide } from "swiper/react";
import { CarouselNextButton, CarouselPrevButton } from "../CarouselButton/CarouselButton";
import { SxProps } from "@mui/material";

const carouselOptions: SwiperOptions = {
	modules: [Navigation, FreeMode, Thumbs],
	spaceBetween: 0,
	navigation: false
};

const thumbsOptions: SwiperOptions = {
	modules: [Navigation, FreeMode, Thumbs],
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
	navigation: {
		prevEl: ".custom_prev",
		nextEl: ".custom_next"
	}
};

interface CarouselWithThumbProps {
	size?: "small" | "medium" | "large";
	sx?: SxProps;
	images: string[];
	onImageClick?: (index: number) => void;
}

const CarouselWithThumb = ({
	size = "small",
	sx,
	images,
	onImageClick
}: CarouselWithThumbProps) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

	return (
		<CarouselContainer sx={sx}>
			<MainCarousel
				{...carouselOptions}
				thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
			>
				{images.map((image, i) => (
					<SwiperSlide key={image}>
						<CarouselImage
							imageurl={image}
							size={size}
							onClick={() => onImageClick && onImageClick(i)}
							pressable={Boolean(onImageClick)}
						/>
					</SwiperSlide>
				))}
			</MainCarousel>
			<ThumbsCarousel {...thumbsOptions} onSwiper={setThumbsSwiper}>
				{images.map(image => (
					<SwiperSlide key={image}>
						<ThumbImage imageurl={image} size={size} />
					</SwiperSlide>
				))}
				<CarouselPrevButton
					className="custom_prev"
					sx={{
						left: "1rem"
					}}
				/>
				<CarouselNextButton
					className="custom_next"
					sx={{
						right: "1rem"
					}}
				/>
			</ThumbsCarousel>
		</CarouselContainer>
	);
};

export default CarouselWithThumb;
