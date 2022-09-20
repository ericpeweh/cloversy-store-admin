// Dependencies
import { styled } from "@mui/system";

// Components
import { TextField } from "@mui/material";

export const TextInputContainer = styled(TextField)(({ theme }) => ({
	"& input": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem"
		}
	}
})) as typeof TextField;
