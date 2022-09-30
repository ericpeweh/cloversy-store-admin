// Dependencies
import { styled } from "@mui/system";

export const NotificationDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")({
	marginTop: "2rem"
});

export const DetailsContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem",
	backgroundColor: "#fff",
	borderRadius: "0.5rem",
	padding: "2rem",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	}
}));

export const DetailItem = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	borderRadius: "0.5rem",
	backgroundColor: theme.palette.grey[100],
	border: `1px solid ${theme.palette.grey[100]}`,
	padding: "1.2rem 2rem"
}));

export const DetailTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 500,
	flex: "0 0 30%",
	position: "relative",
	marginRight: "1rem",
	alignSelf: "flex-start",
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	},
	"&::after": {
		content: "':'",
		position: "absolute",
		height: "100%",
		right: 0
	}
}));

export const DetailDescription = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	flex: 1,
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));
