// Dependencies
import { styled } from "@mui/system";

export const ChattingContainer = styled("section")({
	display: "flex",
	height: "100%",
	borderRadius: "0.5rem",
	overflow: "hidden",
	position: "relative"
});

export const ChatPanelContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	maxHeight: "calc(55rem + 9rem + 6rem)",
	minHeight: "70rem",
	backgroundColor: "#fff",
	borderRadius: "0 0.5rem 0.5rem 0",
	border: `1px solid ${theme.palette.grey[400]}`
}));
