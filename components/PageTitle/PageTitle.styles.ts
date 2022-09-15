// Dependencies
import { styled } from "@mui/system";

export const PageTitleContainer = styled("h1")(({ theme }) => ({
	fontSize: "2.4rem",
	fontWeight: 500,
	marginBottom: "1rem",
	[theme.breakpoints.down("xl")]: {
		fontSize: "2.2rem"
	},
	[theme.breakpoints.down("lg")]: {
		fontSize: "2rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.8rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.6rem"
	}
}));
