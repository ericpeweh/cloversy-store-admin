// Dependencies
import { styled } from "@mui/system";

// Components
import { ButtonBase, Grid } from "@mui/material";

export const ImageInputContainer = styled(Grid)({}) as typeof Grid;

export const InputContainer = styled("div")({
	width: "100%",
	height: "100%",
	borderRadius: "0.5rem",
	backgroundColor: "#fff",
	display: "flex",
	justifyContent: "center"
});

export const InputLabel = styled("label")(({ theme }) => ({
	aspectRatio: "1",
	borderRadius: "0.5rem",
	width: "100%",
	backgroundColor: theme.palette.grey[200],
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	cursor: "pointer",
	color: theme.palette.primary.main,
	"& > svg": {
		width: "5rem",
		height: "5rem"
	}
}));

interface ImageContainerProps {
	imgSrc: string;
}

export const ImageContainer = styled("div")<ImageContainerProps>(({ imgSrc, theme }) => ({
	width: "100%",
	border: `1px solid ${theme.palette.grey[300]}`,
	aspectRatio: "1",
	borderRadius: "0.5rem",
	position: "relative",
	backgroundImage: `url(${imgSrc})`,
	backgroundPosition: "center",
	backgroundSize: "cover"
}));

export const DeleteButton = styled(ButtonBase)(({ theme }) => ({
	cursor: "pointer",
	position: "absolute",
	backgroundColor: theme.palette.grey[300],
	borderRadius: "50%",
	height: "4rem",
	width: "4rem",
	top: "-2rem",
	right: "-2rem",
	[theme.breakpoints.down("sm")]: {
		height: "3rem",
		width: "3rem",
		top: "-1rem",
		right: "-1rem"
	}
})) as typeof ButtonBase;
