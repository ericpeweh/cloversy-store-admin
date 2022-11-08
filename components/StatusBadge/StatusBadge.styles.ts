// Dependencies
import { styled } from "@mui/system";

interface StatusBadgeContainerProps {
	color: string;
	centerText: boolean;
	maxContentWidth?: boolean;
}

export const StatusBadgeContainer = styled("span", {
	shouldForwardProp: props => props !== "color" && props !== "centerText"
})<StatusBadgeContainerProps>(({ theme, color, centerText }) => ({
	display: "flex",
	padding: "0.2rem 1rem",
	borderRadius: "0.5rem",
	fontSize: "1.4rem",
	textAlign: centerText ? "center" : "left",
	justifyContent: centerText ? "center" : "flex-start",
	backgroundColor: theme.palette[color].light,
	color: "#fff",
	alignSelf: "flex-start",
	textTransform: "uppercase",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.3rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.2rem"
	}
}));
