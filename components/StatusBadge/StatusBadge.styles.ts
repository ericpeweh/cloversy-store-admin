// Dependencies
import { styled } from "@mui/system";

interface StatusBadgeContainerProps {
	color: string;
}

export const StatusBadgeContainer = styled("p", {
	shouldForwardProp: props => props !== "color"
})<StatusBadgeContainerProps>(({ theme, color }) => ({
	padding: "0.2rem 1rem",
	borderRadius: "0.5rem",
	fontSize: "1.4rem",
	backgroundColor: theme.palette[color].light,
	color: "#fff",
	alignSelf: "flex-start",
	textTransform: "uppercase"
}));
