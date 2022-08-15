// Dependencies
import { styled } from "@mui/system";

export const OuterContainer = styled("main")(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	width: "calc(100% - var(--sidebar-width))",
	minHeight: "calc(100vh - var(--header-height))",
	marginLeft: "var(--sidebar-width)",
	padding: "3rem 4rem 5rem"
}));
