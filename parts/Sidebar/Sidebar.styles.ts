// Dependencies
import { List, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

interface SidebarContainerProps {
	showSidebar: boolean;
}

export const SidebarContainer = styled("nav", {
	shouldForwardProp: props => props !== "showSidebar"
})<SidebarContainerProps>(({ theme, showSidebar }) => ({
	width: "30rem",
	height: "100%",
	overflow: "auto",
	position: "fixed",
	top: 0,
	left: 0,
	backgroundColor: "#fff",
	boxShadow: "var(--shadow-xs)",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	padding: "1.5rem",
	zIndex: "10",
	transition: "0.2s ease-out",
	[theme.breakpoints.down("lg")]: {
		transform: showSidebar ? "translateX(0)" : "translateX(-100%)"
	}
}));

export const SidebarHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between"
});

export const LogoContainer = styled("div")(({ theme }) => ({
	width: "60%",
	cursor: "pointer",
	[theme.breakpoints.down("lg")]: {
		width: "55%"
	},
	[theme.breakpoints.down("md")]: {
		width: "50%"
	},
	[theme.breakpoints.down("sm")]: {
		width: "45%"
	}
}));

export const NavList = styled(List)({
	gap: "1rem",
	display: "flex",
	flexDirection: "column",
	"& > div": {
		borderRadius: "0.5rem"
	}
});

export const SidebarItemChild = styled(ListItemButton)(({ theme }) => ({
	padding: "0.5rem",
	paddingLeft: "7rem",
	[theme.breakpoints.down("md")]: {
		paddingLeft: "8.5rem"
	}
}));

// Backdrop
interface SidebarBackdropProps {
	showSidebar: boolean;
}

export const SidebarBackdrop = styled("div", {
	shouldForwardProp: props => props !== "showSidebar"
})<SidebarBackdropProps>(({ theme, showSidebar }) => ({
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: 5,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0 0 0 / 40%)",
	transition: "0.2s ease-out",
	opacity: showSidebar ? 1 : 0,
	visibility: showSidebar ? "visible" : "hidden",
	[theme.breakpoints.up("lg")]: {
		display: "none"
	}
}));

export const ItemText = styled(ListItemText)(({ theme }) => ({
	"& .MuiListItemText-primary": {
		fontSize: "1.8rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.7rem"
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "1.6rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.5rem"
		}
	}
})) as typeof ListItemText;
