// Dependencies
import { useRouter } from "next/router";
import React from "react";

// Styles
import {
	CardContent,
	CardDescription,
	CardImage,
	CardPrice,
	CardTitle,
	OrderCardContainer
} from "./OrderCard.styles";

interface OrderCardProps {
	title: string;
	sizeDesc: string;
	qtyDesc: string;
	price: string;
	imageUrl: string;
	clickable?: boolean;
	productId?: number;
}

const OrderCard = ({
	title,
	sizeDesc,
	qtyDesc,
	price,
	imageUrl,
	clickable = false,
	productId
}: OrderCardProps) => {
	const router = useRouter();

	const openProductDetailsHandler = () => router.push(`/products/${productId || ""}`);

	return (
		<OrderCardContainer>
			<CardImage
				imageurl={imageUrl}
				clickable={clickable}
				onClick={() => clickable && openProductDetailsHandler()}
			/>
			<CardContent>
				<CardTitle clickable={clickable} onClick={() => clickable && openProductDetailsHandler()}>
					{title}
				</CardTitle>
				<CardDescription>Ukuran: {sizeDesc}</CardDescription>
				<CardDescription>Jumlah: {qtyDesc}</CardDescription>
			</CardContent>

			<CardPrice>{price}</CardPrice>
		</OrderCardContainer>
	);
};

export default OrderCard;
