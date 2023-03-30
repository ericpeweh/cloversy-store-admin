// Dependencies
import { styled } from "@mui/system";

// Components
import Button from "../../../components/Button/Button";

export const ChattingActionsForm = styled("form")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	position: "relative",
	gap: "1rem",
	alignItems: "center",
	backgroundColor: theme.palette.grey[200],
	borderRadius: "0 0 0.5rem 0.5rem",
	padding: "1rem",
	height: "6rem",
	marginTop: "auto"
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

export const ScrollToBottomButton = styled(Button)({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -220%)"
});
