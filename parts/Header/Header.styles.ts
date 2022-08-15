// Dependencies
import { styled } from "@mui/system";

export const HeaderContainer = styled("nav")(({ theme }) => ({
	width: `calc(100% - var(--sidebar-width))`,
	marginLeft: "var(--sidebar-width)",
	height: "var(--header-height)",
	backgroundColor: "#fff",
	boxShadow: "0rem 1rem 1rem 0 rgba(0 0 0 / 10%)",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
	padding: "0 3rem"
}));

export const Username = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	fontWeight: 400,
	color: theme.palette.grey[500]
}));

export const InfoBox = styled("div")({
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	columnGap: "2rem",
	backgroundColor: "#fff",
	boxShadow: "var(--shadow-light)",
	borderRadius: "0.5rem",
	padding: "2rem",
	alignItems: "center"
});

interface InfoIconProps {
	bgColor: string;
}

export const InfoIcon = styled("div", {
	shouldForwardProp: props => props !== "bgColor"
})<InfoIconProps>(({ bgColor }) => ({
	width: "5rem",
	height: "5rem",
	borderRadius: "50%",
	backgroundColor: bgColor,
	display: "grid",
	placeItems: "center",
	gridColumn: "0 / 1",
	gridRow: "1 / span 2"
}));

export const InfoTitle = styled("h2")({
	fontSize: "1.7rem",
	fontWeight: 500,
	gridRow: "1 / 2"
});

export const InfoDescription = styled("h2")({
	fontSize: "1.5rem",
	fontWeight: 400,
	gridRow: "2 / 3"
});
