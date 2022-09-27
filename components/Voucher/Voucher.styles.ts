// Dependencies
import { styled } from "@mui/system";

export const VoucherContainer = styled("div")(({ theme }) => ({
	display: "flex",
	border: `1px solid ${theme.palette.grey[400]}`,
	borderRadius: "0.5rem",
	position: "relative",
	"&::after": {
		content: "''",
		position: "absolute",
		left: "-0.5rem",
		top: 0,
		height: "100%",
		width: "0.5rem",
		backgroundImage: `radial-gradient(
    circle at 0 1px,
    #fff 0,
    #fff 3px,
    ${theme.palette.primary.main} 0,
    ${theme.palette.primary.main} 0
    )`,
		backgroundColor: "salmon",
		backgroundRepeat: "repeat-y",
		backgroundSize: "1rem 1rem"
	}
}));

export const VoucherInfo = styled("div")({
	display: "flex",
	flexDirection: "column",
	flex: 1
});

export const VoucherContent = styled("div")({
	padding: "1rem 2rem"
});

export const VoucherTitle = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontFamily: "var(--font-secondary)",
	fontWeight: 600,
	display: "flex",
	gap: "1rem",
	marginBottom: "0.5rem",
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

export const VoucherExpiry = styled("p")(({ theme }) => ({
	fontSize: "1.5rem",
	color: theme.palette.grey[500],
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const VoucherCode = styled("p")(({ theme }) => ({
	fontSize: "1.6rem",
	color: theme.palette.grey[800],
	padding: "0.2rem 0",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	letterSpacing: "3px",
	borderTop: `2px dashed ${theme.palette.primary.light}`,
	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.4rem"
	}
}));

export const VoucherImage = styled("div")(({ theme }) => ({
	width: "11rem",
	alignSelf: "stretch",
	backgroundColor: theme.palette.primary.main,
	color: "#fff",
	overflow: "hidden",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
	[theme.breakpoints.down("md")]: {
		width: "9.5rem"
	},
	[theme.breakpoints.down("sm")]: {
		width: "8rem"
	}
}));
