// Dependencies
import { styled } from "@mui/system";

// Components
import { TextField } from "@mui/material";

export const TextInputContainer = styled(TextField)(({ theme, ...props }) => ({
	whiteSpace: props.multiline ? "pre-wrap" : "normal",
	"& label, & label:focused": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem"
		}
	},
	"& input": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem",
			padding: "1.1rem 2rem"
		}
	}
})) as typeof TextField;

export const InputLimitText = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	color: theme.palette.grey[400],
	position: "absolute",
	bottom: "1rem",
	right: "1rem",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));
