// Dependencies
import { styled } from "@mui/system";

export const EditOrderContainer = styled("div")({});

export const FormContainer = styled("form")(({ theme }) => ({
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	marginTop: "2rem",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem 1rem"
	}
}));

export const InputTitle = styled("h4")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginBottom: "2rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const TimelineItem = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem"
});

export const TimelineText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	color: theme.palette.grey[600],
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const TimelineAction = styled("div")({
	display: "flex",
	gap: "0.5rem",
	marginLeft: "auto"
});
