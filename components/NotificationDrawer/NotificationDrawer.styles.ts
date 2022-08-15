// Dependencies
import { Avatar, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

export const NotificationDrawerContainer = styled(Drawer)({
	position: "relative",
	"& .MuiDrawer-paper": {
		width: "50rem",
		display: "flex",
		flexDirection: "column",
		padding: "2rem 2rem 3rem"
	}
}) as typeof Drawer;

export const HideNotificationButton = styled(Button)(({ theme }) => ({
	color: theme.palette.grey[500],
	fontSize: "1.4rem",
	alignSelf: "flex-start"
}));

export const NotificationLists = styled(List)(({ theme }) => ({
	width: "100%"
})) as typeof List;

export const NotificationItem = styled(ListItem)({
	alignItems: "flex-start",
	paddingRight: "0",
	cursor: "pointer"
});

export const NotificationItemImage = styled(Avatar)({
	width: "6rem",
	height: "6rem",
	borderRadius: "50%"
}) as typeof Avatar;

export const NotificationItemContent = styled(ListItemText)({
	marginTop: "0",
	"& .MuiListItemText-primary": {
		fontWeight: 600,
		textTransform: "uppercase",
		fontSize: "1.5rem",
		cursor: "pointer"
	},
	"& .MuiListItemText-secondary": {}
}) as typeof ListItemText;

export const NotificationActionButtons = styled("div")({
	justifySelf: "flex-end",
	display: "flex",
	flexDirection: "column",
	marginTop: "auto",
	gap: "1rem"
});
