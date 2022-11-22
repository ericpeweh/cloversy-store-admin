// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Styles
import {
	ProductListCardContainer,
	ProductImage,
	ProductText,
	ProductTitle,
	StatusContainer
} from "./ProductListCard.styles";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Types
import { Product } from "../../interfaces";

// Components
import BoxButton from "../BoxButton/BoxButton";
import StatusBadge from "../StatusBadge/StatusBadge";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	productData: Product;
}

const ProductListCard = ({ onMoreButtonClick, productData }: ProdListItemProps) => {
	const router = useRouter();

	const openProductDetailHandler = () => router.push(`/products/${productData.id}`);

	return (
		<ProductListCardContainer>
			<ProductImage
				imageUrl={productData.image || "/images/no-image.png"}
				onClick={openProductDetailHandler}
			/>
			<StatusContainer>
				<StatusBadge color={productData.status === "disabled" ? "error" : "primary"}>
					{productData.status}
				</StatusBadge>
			</StatusContainer>
			<ProductTitle onClick={openProductDetailHandler}>{productData.title}</ProductTitle>
			<ProductText>{formatToRupiah(productData.price)}</ProductText>
			<BoxButton onClick={onMoreButtonClick}>
				<MoreHorizIcon fontSize="small" />
			</BoxButton>
		</ProductListCardContainer>
	);
};

export default ProductListCard;
