// Dependencies
import { styled } from "@mui/system";

export const SectionTitleContainer = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	[theme.breakpoints.down("xl")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));
