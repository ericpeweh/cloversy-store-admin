// Dependencies
import { styled } from "@mui/system";

export const RecentOrdersContainer = styled("div")(({ theme }) => ({
	padding: "2rem",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-light)",
	backgroundColor: "#fff",
	[theme.breakpoints.down("sm")]: {
		padding: "1.5rem"
	}
}));

export const TableContainer = styled("div")({
	marginTop: "2rem"
});
