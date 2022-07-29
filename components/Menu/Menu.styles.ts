// Dependencies
import { styled } from "@mui/system";

// Components
import { Menu } from "@mui/material";

export const MenuContainer = styled(Menu)(({ theme }) => ({
	"& > .MuiMenu-paper": {
		borderRadius: "0.5rem",
		border: `1px solid ${theme.palette.grey[300]}`
	},
	"& .MuiMenu-list .MuiMenuItem-root": {
		paddingRight: "5rem"
	}
}));
