// Dependencies
import { styled } from "@mui/system";

export const EditOrderContainer = styled("div")({});

export const FormContainer = styled("form")({
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	marginTop: "2rem"
});

export const InputTitle = styled("h4")({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginBottom: "2rem"
});

export const TimelineItem = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem"
});

export const TimelineText = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	color: theme.palette.grey[600]
}));

export const TimelineAction = styled("div")({
	display: "flex",
	gap: "0.5rem",
	marginLeft: "auto"
});
