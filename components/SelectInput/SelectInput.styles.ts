// Dependencies
import { styled } from "@mui/system";

// Components
import { FormControl, MenuItem } from "@mui/material";

export const SelectInputContainer = styled(FormControl)(({ theme }) => ({
	"& 	.MuiSelect-select": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem",
			padding: "1rem 2rem"
		}
	},
	"& li": {
		fontSize: "1.6rem",
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.4rem"
		},
		color: "red"
	}
})) as typeof FormControl;

export const SelectMenuItem = styled(MenuItem)(({ theme }) => ({
	fontSize: "1.6rem",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
})) as typeof MenuItem;
