// Dependencies
import React from "react";
import QuantityInput from "../QuantityInput/QuantityInput";

// Styles
import {
	CardContent,
	CardDescription,
	CardImage,
	CardPrice,
	CardTitle,
	InputContainer,
	OrderCardContainer
} from "./OrderCard.styles";

interface OrderCardProps {
	title: string;
	sizeDesc: string;
	qtyDesc: string;
	price: string;
	showInput?: boolean;
}

const OrderCard = ({ title, sizeDesc, qtyDesc, price, showInput = false }: OrderCardProps) => {
	return (
		<OrderCardContainer>
			<CardImage />
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Ukuran: {sizeDesc}</CardDescription>
				{!showInput && <CardDescription>Jumlah: {qtyDesc}</CardDescription>}
			</CardContent>

			<CardPrice>Rp {price}</CardPrice>
		</OrderCardContainer>
	);
};

export default OrderCard;
