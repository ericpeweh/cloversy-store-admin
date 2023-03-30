// Dependencies
import { styled } from "@mui/system";

export const MyAccountDetailsContainer = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	padding: "3rem",
	borderRadius: "0.5rem",
	[theme.breakpoints.down("md")]: {
		padding: "2.2rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem"
	}
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	marginBottom: "1rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));

export const UserEmail = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	marginBottom: "1rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const ProfilePictureInputContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "2rem",
	marginBottom: "1rem"
});

export const InputContainer = styled("div")({
	marginBottom: "0.5rem"
});

export const FormContainer = styled("form")(({ theme }) => ({
	marginBottom: "5rem",
	[theme.breakpoints.down("md")]: {
		marginBottom: "4rem"
	}
}));
