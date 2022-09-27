// Dependencies
import { styled } from "@mui/system";

export const AreaChartContainer = styled("div")(({ theme }) => ({
	width: "100%",
	height: "40rem",
	background: "#fff",
	borderRadius: "0.5rem",
	marginTop: "2rem",
	padding: "2rem",
	fontSize: "1.4rem",
	overflowX: "hidden",
	overflowY: "hidden",
	[theme.breakpoints.down("md")]: {
		fontSize: "1.3rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.2rem",
		overflowX: "auto"
	}
}));
