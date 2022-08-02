// Dependencies
import { styled } from "@mui/system";

// Components
import { Grid } from "@mui/material";

export const AddProductContainer = styled("div")({});

export const FormContainer = styled("form")({
	mr: "-2.4rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	marginTop: "2rem"
});

export const TagsContainer = styled("ul")(({ theme }) => ({
	marginTop: "2rem",
	display: "flex",
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
			padding: "1rem 0.5rem"
		}
	}
}));

export const InputTitle = styled("h4")({
	fontSize: "1.7rem",
	fontWeight: 500,
	marginBottom: "2rem"
});
