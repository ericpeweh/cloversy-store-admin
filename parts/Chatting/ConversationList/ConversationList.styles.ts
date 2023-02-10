// Dependencies
import { styled } from "@mui/system";

// Components
import { Button } from "@mui/material";

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

interface ConversationItemProps {
	isSelected: boolean;
}

export const ConversationItem = styled("div", {
	shouldForwardProp: props => props !== "isSelected"
})<ConversationItemProps>(({ theme, isSelected }) => ({
	padding: "2rem",
	backgroundColor: isSelected ? theme.palette.grey[200] : "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	cursor: "pointer",
	transition: "0.1s ease-in",
	"&:hover": {
		backgroundColor: isSelected ? theme.palette.grey[200] : "#f7f7f7"
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
	isAvailable?: boolean;
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
	shouldForwardProp: props => props !== "unread" && props !== "isAvailable"
})<ConversationProps>(({ unread = false, isAvailable, theme }) => ({
	fontSize: "1.5rem",
	fontWeight: unread ? 500 : 400,
	fontStyle: isAvailable ? "normal" : "italic",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));
