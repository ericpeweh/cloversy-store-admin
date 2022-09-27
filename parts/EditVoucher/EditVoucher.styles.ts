// Dependencies
import { styled } from "@mui/system";

export const EditVoucherContainer = styled("div")({});

export const FormContainer = styled("form")(({ theme }) => ({
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	marginTop: "2rem",
	[theme.breakpoints.down("sm")]: {
		padding: "2rem 1rem"
	}
}));

export const InputTitle = styled("h4")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginBottom: "2rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem",
		marginBottom: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem",
		marginBottom: "1rem"
	}
}));

export const UserContainer = styled("ul")(({ theme }) => ({
	display: "flex",
	marginBottom: "1rem",
	gap: "1rem",
	flexWrap: "wrap",
	listStyle: "none",
	fontSize: "2rem !important",
	"& > li": {
		width: "max-content",
		padding: "0",
		"& > div": {
			fontSize: "1.6rem",
			borderRadius: "0.5rem",
			padding: "1rem 0.5rem",
			[theme.breakpoints.down("md")]: {
				fontSize: "1.5rem"
			},
			[theme.breakpoints.down("sm")]: {
				fontSize: "1.35rem"
			}
		}
	}
}));
