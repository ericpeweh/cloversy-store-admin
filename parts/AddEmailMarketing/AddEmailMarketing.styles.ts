// Dependencies
import { styled } from "@mui/system";

export const AddEmailMarketingContainer = styled("div")({});

export const FormContainer = styled("form")(({ theme }) => ({
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	marginTop: "2rem",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
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
		fontSize: "1.5rem"
	}
}));
