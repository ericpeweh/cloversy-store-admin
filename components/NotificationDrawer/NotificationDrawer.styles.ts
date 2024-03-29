// Dependencies
import { Avatar, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

export const NotificationDrawerContainer = styled(Drawer)(({ theme }) => ({
	position: "relative",
	"& .MuiDrawer-paper": {
		width: "50rem",
		display: "flex",
		flexDirection: "column",
		padding: "2rem",
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	}
})) as typeof Drawer;

export const HideNotificationButton = styled(Button)(({ theme }) => ({
	color: theme.palette.grey[500],
	fontSize: "1.6rem",
	alignSelf: "flex-start",
	paddingLeft: "0",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));

export const NotificationLists = styled(List)(({ theme }) => ({
	width: "100%"
})) as typeof List;

export const NotificationItem = styled(ListItem)(({ theme }) => ({
	alignItems: "flex-start",
	paddingRight: "0",
	paddingLeft: "0.5rem",
	cursor: "pointer",
	[theme.breakpoints.down("sm")]: {
		paddingLeft: "0"
	}
}));

export const NotificationItemImage = styled(Avatar)(({ theme }) => ({
	width: "6rem",
	height: "6rem",
	borderRadius: "50%",
	[theme.breakpoints.down("sm")]: {
		width: "5.5rem",
		height: "5.5rem"
	}
})) as typeof Avatar;

export const NotificationItemContent = styled(ListItemText)(({ theme }) => ({
	marginTop: "0",
	"& .MuiListItemText-primary": {
		textTransform: "uppercase",
		fontSize: "1.6rem",
		cursor: "pointer",
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.5rem"
		}
	},
	"& .MuiListItemText-secondary": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem"
		}
	}
})) as typeof ListItemText;

export const NotificationActionButtons = styled("div")({
	justifySelf: "flex-end",
	display: "flex",
	flexDirection: "column",
	marginTop: "auto",
	gap: "1rem"
});
