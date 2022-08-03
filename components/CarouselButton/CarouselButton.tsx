// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import { SvgIconProps, SxProps } from "@mui/material";

// Styles
import { CarouselButton } from "./CarouselButton.styles";

interface ButtonProps {
	className: string;
	sx: SxProps;
}

const iconProps: SvgIconProps = {
	fontSize: "large",
	color: "primary"
};

export const CarouselPrevButton = (props: ButtonProps) => {
	return (
		<CarouselButton {...props}>
			<ChevronLeftIcon {...iconProps} />
		</CarouselButton>
	);
};

export const CarouselNextButton = (props: ButtonProps) => {
	return (
		<CarouselButton {...props}>
			<ChevronRightIcon {...iconProps} />
		</CarouselButton>
	);
};
