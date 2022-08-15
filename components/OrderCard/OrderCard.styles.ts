// Dependencies
import { styled } from "@mui/system";

export const OrderCardContainer = styled("div")(({ theme }) => ({
	borderRadius: "0.5rem",
	padding: "1rem",
	display: "flex",
	gap: "2rem",
	justifyContent: "space-between"
}));

export const CardImage = styled("div")({
	backgroundImage: "url(/images/product.jpg)",
	backgroundSize: "cover",
	backgroundPosition: "center",
	borderRadius: "0.5rem",
	height: "9rem",
	width: "11rem"
});

export const CardContent = styled("div")({
	display: "flex",
	flexDirection: "column",
	width: "max-content",
	marginRight: "auto"
});

export const CardTitle = styled("h3")({
	fontSize: "1.9rem",
	fontWeight: 500,
	marginBottom: "0.7rem"
});

export const CardDescription = styled("p")(({ theme }) => ({
	color: theme.palette.grey[500],
	fontSize: "1.5rem"
}));

export const CardQuantity = styled("p")({
	fontSize: "1.7rem"
});

export const CardPrice = styled("p")(({ theme }) => ({
	fontSize: "1.8rem",
	color: theme.palette.primary.main,
	alignSelf: "center",
	fontWeight: 500
}));

export const InputContainer = styled("div")({
	flex: 1,
	marginRight: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "1rem",
	"& > div": {
		width: "max-content"
	}
});
