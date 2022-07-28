// Dependencies
import { List, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";

export const SidebarContainer = styled("nav")({
	width: "30rem",
	height: "100%",
	maxHeight: "100vh",
	overflow: "auto",
	position: "fixed",
	top: 0,
	left: 0,
	backgroundColor: "#fff",
	boxShadow: "var(--shadow-xs)",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	padding: "1.5rem"
});

export const SidebarHeader = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between"
});

export const LogoContainer = styled("div")({
	width: "60%"
});

export const NavList = styled(List)({
	gap: "1rem",
	display: "flex",
	flexDirection: "column",
	"& > div": {
		borderRadius: "0.5rem"
	}
});

export const SidebarItemChild = styled(ListItemButton)({
	padding: "0.5rem",
	paddingLeft: "7rem"
});
