// Dependencies
import { styled } from "@mui/system";

export const PreviewContainer = styled("div")(({ theme }) => ({
	width: "100%",
	position: "relative",
	overflow: "hidden",
	paddingTop: "80rem",
	"& > iframe": {
		border: `1px solid ${theme.palette.grey[400]}`,
		borderRadius: "0.5rem",
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: "100%",
		height: "100%"
	},
	[theme.breakpoints.down("xl")]: {
		paddingTop: "70rem"
	},
	[theme.breakpoints.down("lg")]: {
		paddingTop: "65rem"
	},
	[theme.breakpoints.down("md")]: {
		paddingTop: "75rem"
	}
}));

export const SectionTitle = styled("h4")(({ theme }) => ({
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
