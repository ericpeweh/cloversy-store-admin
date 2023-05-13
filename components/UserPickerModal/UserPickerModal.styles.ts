// Dependencies
import { styled } from "@mui/system";

// Components
import { Dialog } from "@mui/material";

export const UserPickerModalContainer = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paper": {
		minHeight: "60vh",
		minWidth: "42vw",
		[theme.breakpoints.down("xl")]: {
			minWidth: "60vw"
		},
		[theme.breakpoints.down("lg")]: {
			minWidth: "70vw"
		},
		[theme.breakpoints.down("md")]: {
			minWidth: "80vw"
		},
		[theme.breakpoints.down("sm")]: {
			minWidth: "100vw"
		}
	}
})) as typeof Dialog;

export const UserPickerHeader = styled("div")(({ theme }) => ({
	padding: "3rem",
	marginBottom: "2rem",
	paddingBottom: "0rem",
	[theme.breakpoints.down("sm")]: {
		padding: "2rem",
		paddingBottom: "0rem"
	}
}));

export const ModalTitle = styled("h2")(({ theme }) => ({
	fontSize: "2.2rem",
	marginBottom: "1rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "2rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.8rem"
	}
}));

export const UserOptions = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	padding: "2rem 3rem 4rem",
	[theme.breakpoints.down("sm")]: {
		padding: "2rem 2rem 2rem",
		maxHeight: "70vh"
	}
}));

export const UserScroller = styled("div")(({ theme }) => ({
	maxHeight: "50rem",
	overflow: "auto",
	[theme.breakpoints.down("sm")]: {
		maxHeight: "70vh"
	}
}));

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

export const UserContent = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "2rem",
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		gap: "1.5rem"
	}
}));

export const UserInfo = styled("div")({});

export const Username = styled("h3")(({ theme }) => ({
	fontSize: "1.7rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const Email = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	lineHeight: "1.6rem",
	color: theme.palette.grey[500],
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem",
		marginTop: "0.2rem"
	}
}));
