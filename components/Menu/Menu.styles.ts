// Dependencies
import { styled } from "@mui/system";

// Components
import { Menu } from "@mui/material";

export const MenuContainer = styled(Menu)(({ theme }) => ({
	"& > .MuiMenu-paper": {
		borderRadius: "0.5rem",
		border: `1px solid ${theme.palette.grey[300]}`,
		boxShadow: "var(--shadow-md)"
	},
	"& .MuiMenu-list .MuiMenuItem-root": {
		paddingRight: "5rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.5rem"
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "1.4rem"
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.3rem"
		}
	}
}));
