// Dependencies
import { styled } from "@mui/system";

export const DateTimePickerContainer = styled("div")(({ theme }) => ({
	"& > div": {
		width: "100%"
	},
	"& input": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem"
		}
	}
}));
