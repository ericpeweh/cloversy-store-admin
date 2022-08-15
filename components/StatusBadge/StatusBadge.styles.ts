// Dependencies
import { styled } from "@mui/system";

interface StatusBadgeContainerProps {
	color: string;
	centerText: boolean;
}

export const StatusBadgeContainer = styled("p", {
	shouldForwardProp: props => props !== "color" && props !== "centerText"
})<StatusBadgeContainerProps>(({ theme, color, centerText }) => ({
	padding: "0.2rem 1rem",
	borderRadius: "0.5rem",
	fontSize: "1.4rem",
	textAlign: centerText ? "center" : "left",
	backgroundColor: theme.palette[color].light,
	color: "#fff",
	alignSelf: "flex-start",
	textTransform: "uppercase"
}));
