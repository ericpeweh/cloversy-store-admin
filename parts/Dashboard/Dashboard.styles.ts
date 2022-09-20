// Dependencies
import { styled } from "@mui/system";

export const DashboardContainer = styled("div")({});

export const RecentOrdersContainer = styled("ul")({
	display: "flex",
	flexDirection: "column",
	gap: "1rem"
});

export const ChartContainer = styled("div")({
	boxShadow: "var(--shadow-light)",
	backgroundColor: "#fff",
	borderRadius: "0.5rem"
});

export const OrderItem = styled("li")({
	borderRadius: "0.5rem",
	padding: "1rem",
	display: "flex",
	alignItems: "center"
});

export const OrderNumber = styled("h3")(({ theme }) => ({
	fontSize: "1.7rem",
	flex: 1,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const InfoBox = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	columnGap: "2rem",
	backgroundColor: "#fff",
	boxShadow: "var(--shadow-light)",
	borderRadius: "0.5rem",
	padding: "2rem",
	alignItems: "center",
	[theme.breakpoints.down("md")]: {
		padding: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		padding: "1ree"
	}
}));

interface InfoIconProps {
	bgColor: string;
}

export const InfoIcon = styled("div", {
	shouldForwardProp: props => props !== "bgColor"
})<InfoIconProps>(({ bgColor, theme }) => ({
	width: "5rem",
	aspectRatio: "1",
	borderRadius: "50%",
	backgroundColor: bgColor,
	display: "grid",
	placeItems: "center",
	gridColumn: "0 / 1",
	gridRow: "1 / span 2",
	[theme.breakpoints.down("md")]: {
		width: "4.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		width: "4rem"
	}
}));

export const InfoTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	gridRow: "1 / 2",
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.7rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.6rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem"
	}
}));

export const InfoDescription = styled("h2")(({ theme }) => ({
	fontSize: "1.6rem",
	fontWeight: 400,
	gridRow: "2 / 3",
	[theme.breakpoints.down("lg")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "1.4rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.3rem"
	}
}));
