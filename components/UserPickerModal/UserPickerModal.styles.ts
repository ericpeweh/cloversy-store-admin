// Dependencies
import { styled } from "@mui/system";

// Components
import { Dialog } from "@mui/material";

export const UserPickerModalContainer = styled(Dialog)({
	"& .MuiDialog-paper": {
		minHeight: "70vh",
		minWidth: "42vw"
	}
}) as typeof Dialog;

export const UserPickerHeader = styled("div")({
	padding: "3rem",
	marginBottom: "2rem",
	paddingBottom: "0rem"
});

export const ModalTitle = styled("h2")({
	fontSize: "2.2rem",
	marginBottom: "1rem"
});

export const UserOptions = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	maxHeight: "50rem",
	overflow: "auto",
	padding: "2rem 3rem 4rem"
});

export const UserContainer = styled("div")(({ theme }) => ({
	padding: "1.5rem",
	borderRadius: "0.5rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "2rem",
	border: `1px solid ${theme.palette.grey[300]}`
}));

export const UserImage = styled("div")({
	width: "5rem",
	height: "5rem",
	borderRadius: "50%",
	overflow: "hidden",
	"& > img": {
		fitContent: "cover"
	}
});

export const UserContent = styled("div")({
	display: "flex",
	gap: "2rem",
	alignItems: "center"
});

export const UserInfo = styled("div")({});

export const Username = styled("h3")({
	fontSize: "1.7rem"
});

export const Email = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	lineHeight: "1.6rem",
	color: theme.palette.grey[500]
}));
