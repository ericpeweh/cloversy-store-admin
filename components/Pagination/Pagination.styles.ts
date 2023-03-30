// Dependencies
import { styled } from "@mui/system";

// Components
import { Pagination } from "@mui/material";

export const PaginationContainer = styled(Pagination)(({ theme }) => ({
	"& button": {
		padding: "0",
		[theme.breakpoints.down("sm")]: {
			margin: "0.2rem"
		}
	}
})) as typeof Pagination;
