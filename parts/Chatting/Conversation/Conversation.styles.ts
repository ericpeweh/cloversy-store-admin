// Dependencies
import { styled } from "@mui/system";

export const ConversationContainer = styled("div")(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[300]}`,
	flex: 1,
	padding: "2rem",
	paddingBottom: "0rem",
	height: "100%",
	display: "flex",
	flexDirection: "column-reverse",
	gap: "1rem",
	overflowY: "auto",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1rem"
	}
}));

export const GroupTimestamp = styled("div")(({ theme }) => ({
	borderRadius: "0.5rem",
	backgroundColor: theme.palette.grey[200],
	color: theme.palette.grey[600],
	fontSize: "1.4rem",
	textAlign: "center",
	padding: "0.5rem 1rem",
	alignSelf: "center",
	marginTop: "5rem",
	marginBottom: "1rem",
	fontFamily: "var(--font-secondary)",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem",
		marginTop: "3rem"
	}
}));

export const BubbleGroup = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	marginBottom: "2rem",
	[theme.breakpoints.down("sm")]: {
		marginBottom: "1.5rem"
	}
}));

interface ChatBubbleProps {
	align?: "left" | "right";
}

export const ChatBubble = styled("div", {
	shouldForwardProp: props => props !== "align"
})<ChatBubbleProps>(({ theme, align = "left" }) => ({
	backgroundColor: align === "left" ? theme.palette.grey[200] : theme.palette.primary.main,
	borderRadius: "0.5rem",
	alignSelf: align === "left" ? "flex-start" : "flex-end",
	color: align === "left" ? theme.palette.grey[800] : "#fff",
	position: "relative",
	maxWidth: "65%",
	padding: "1rem 1.5rem",
	paddingRight: "6rem",
	fontSize: "1.6rem",
	wordBreak: "break-all",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem",
		maxWidth: "75%"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem",
		maxWidth: "80%"
	}
}));

export const BubbleTimestamp = styled("p")(({ theme }) => ({
	position: "absolute",
	bottom: "0.5rem",
	right: "1rem",
	fontSize: "1.4rem",
	fontFamily: "var(--font-secondary)",
	color: "inherit",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));
