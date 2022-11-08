// Dependencies
import { styled } from "@mui/system";

// Components
import { Button } from "@mui/material";

export const ChattingContainer = styled("section")({
	display: "flex",
	height: "100%",
	borderRadius: "0.5rem",
	overflow: "hidden",
	position: "relative"
});

interface ConversationPanelContainerProps {
	show: boolean;
}

export const ConversationPanelContainer = styled("div", {
	shouldForwardProp: props => props !== "show"
})<ConversationPanelContainerProps>(({ theme, show }) => ({
	width: "40rem",
	maxHeight: "calc(55rem + 9rem + 6rem)",
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#fff",
	border: `1px solid ${theme.palette.grey[400]}`,
	transition: "0.2s ease-out",
	[theme.breakpoints.down("md")]: {
		position: "absolute",
		top: "0",
		left: show ? "0" : "-100%",
		zIndex: 10
	},
	[theme.breakpoints.down("sm")]: {
		width: "100%"
	}
}));

export const HideConversationButton = styled(Button)(({ theme }) => ({
	color: theme.palette.grey[500],
	backgroundColor: theme.palette.grey[200],
	width: "100%",
	borderRadius: "0",
	fontSize: "1.6rem",
	alignSelf: "flex-start",
	justifyContent: "flex-start",
	paddingLeft: "2rem",
	display: "none",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem",
		display: "flex"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const Conversation = styled("div")(({ theme }) => ({
	padding: "2rem",
	backgroundColor: theme.palette.grey[100],
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	cursor: "pointer",
	transition: "0.1s ease-in",
	"&:hover": {
		backgroundColor: "#fff"
	}
}));

export const ConversationImage = styled("div")(({ theme }) => ({
	marginRight: "2rem",
	[theme.breakpoints.down("sm")]: {
		marginRight: "1.5rem"
	}
}));

export const ConversationContent = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	flex: 1
});

interface ConversationProps {
	unread?: boolean;
}

export const ConversationTitle = styled("h3", {
	shouldForwardProp: props => props !== "unread"
})<ConversationProps>(({ unread = false, theme }) => ({
	fontSize: "1.7rem",
	fontWeight: unread ? 500 : 400,
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const ConversationTime = styled("p", {
	shouldForwardProp: props => props !== "unread"
})<ConversationProps>(({ unread = false, theme }) => ({
	fontSize: "1.4rem",
	color: unread ? theme.palette.primary.main : theme.palette.grey[500],
	fontWeight: unread ? 500 : 400,
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const ConversationLatest = styled("p", {
	shouldForwardProp: props => props !== "unread"
})<ConversationProps>(({ unread = false, theme }) => ({
	fontSize: "1.5rem",
	fontWeight: unread ? 500 : 400,
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const ChatPanelContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	flex: 1,
	backgroundColor: "#fff"
});

export const ChattingHeader = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "2rem",
	height: "9rem",
	alignItems: "center",
	backgroundColor: theme.palette.grey[200],
	borderRadius: "0.5rem 0.5rem 0 0",
	padding: "1rem",
	border: `1px solid ${theme.palette.grey[300]}`,
	[theme.breakpoints.down("sm")]: {
		gap: "1.5rem"
	}
}));

export const NameContainer = styled("div")({});

export const Name = styled("h3")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const Position = styled("p")(({ theme }) => ({
	fontSize: "1.4rem",
	fontWeight: 400,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.3rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.2rem"
	}
}));

export const ConversationContainer = styled("div")(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[300]}`,
	flex: 1,
	padding: "2rem",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	maxHeight: "55rem",
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
	fontFamily: "var(--font-secondary)",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
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

export const ChattingActions = styled("form")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	position: "relative",
	gap: "1rem",
	alignItems: "center",
	backgroundColor: theme.palette.grey[200],
	borderRadius: "0 0 0.5rem 0.5rem",
	padding: "1rem",
	height: "6rem"
}));

export const ChatInput = styled("input")(({ theme }) => ({
	fontSize: "1.6rem",
	flex: 1,
	padding: "1.2rem 1.5rem",
	border: "none",
	borderRadius: "0.5rem",
	outline: "none",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	},
	"&:active, &:focus": {
		outline: `1px solid ${theme.palette.primary.main}`
	}
}));
