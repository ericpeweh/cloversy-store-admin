// Dependencies
import { styled } from "@mui/system";

export const OrderDetailsContainer = styled("div")({});

export const ContentContainer = styled("div")({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-xs)"
});

// Header
export const ContentHeader = styled("div")({
	backgroundColor: "#fff",
	padding: "2rem",
	marginTop: "2rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	borderRadius: "0.5rem",
	boxShadow: "var(--shadow-light)"
});

export const OrderDate = styled("h3")({
	fontSize: "1.5rem",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	gap: "1rem"
});

export const OrderNumber = styled("h2")(({ theme }) => ({
	fontSize: "1.8rem",
	fontWeight: 500,
	color: theme.palette.primary.main,
	marginBottom: "0.5rem",
	display: "flex",
	alignItems: "center",
	gap: "1rem"
}));

// Order product details
export const DetailsContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "1.2rem"
});

export const DetailItem = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	borderRadius: "0.5rem",
	backgroundColor: theme.palette.grey[100],
	border: `1px solid ${theme.palette.grey[100]}`,
	padding: "1.2rem 2rem"
}));

export const DetailTitle = styled("h2")({
	fontSize: "1.6rem",
	fontWeight: 500,
	flex: "0 0 30%",
	position: "relative",
	marginRight: "1rem",
	alignSelf: "flex-start",
	"&::after": {
		content: "':'",
		position: "absolute",
		height: "100%",
		right: 0
	}
});

export const DetailDescription = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	flex: 1
});

export const OrderCardContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	"& > div": {
		paddingLeft: "0",
		paddingRight: "0"
	}
});

// Section
export const Section = styled("div")({
	marginBottom: "3rem"
});

export const SectionTitle = styled("h2")({
	fontSize: "1.8rem",
	fontWeight: 500,
	marginBottom: "0.5rem"
});

export const InfoContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: "1rem"
});

export const InfoTitle = styled("h3")(({ theme }) => ({
	fontSize: "1.7rem",
	color: theme.palette.grey[500],
	fontWeight: 400
}));

export const InfoDescription = styled("p")(({ theme }) => ({
	fontSize: "1.7rem",
	"& > span": {
		color: theme.palette.primary.main,
		fontFamily: "var(--font-secondary)",
		fontWeight: 600
	}
}));

export const TotalPriceText = styled("p")(({ theme }) => ({
	fontSize: "2rem",
	color: theme.palette.primary.main,
	alignSelf: "center",
	fontWeight: 500
}));

// Address
export const AddressContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	marginBottom: "1rem"
});

export const AddressName = styled("h4")(({ theme }) => ({
	fontSize: "1.7rem",
	color: theme.palette.grey[700],
	fontWeight: 500,
	marginTop: "2rem"
}));

export const AddressNumber = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	marginBottom: "1rem"
});

export const Address = styled("p")({
	fontSize: "1.6rem",
	fontWeight: 400,
	marginBottom: "0.5rem"
});
