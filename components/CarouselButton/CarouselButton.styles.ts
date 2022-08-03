// Dependencies
import { styled } from "@mui/system";

// Components
import { IconButton } from "@mui/material";

export const CarouselButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: "rgba(255 255 255 / 70%)",
	borderRadius: "50%",
	width: "3rem",
	height: "3rem",
	position: "absolute",
	zIndex: 10,
	top: "50%",
	transform: "translateY(-50%)",
	transition: "0.3s ease",
	"&:hover": {
		backgroundColor: "rgba(255 255 255 / 100%)"
	},
	"&:disabled": {
		display: "none"
	}
})) as typeof IconButton;
