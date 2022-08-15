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

export const OrderNumber = styled("h3")({
	fontSize: "1.7rem",
	flex: 1
});
