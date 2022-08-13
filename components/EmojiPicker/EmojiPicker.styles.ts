import { styled } from "@mui/system";

export const EmojiPickerContainer = styled("div")({
	flex: "0 0 100%",
	width: "100%",
	position: "absolute",
	bottom: "100%",
	display: "flex",
	left: 0,
	"& > aside": {
		flex: 1
	}
});
