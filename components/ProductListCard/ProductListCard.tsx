// Dependencies
import React from "react";

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

// Components
import BoxButton from "../BoxButton/BoxButton";
import StatusBadge from "../StatusBadge/StatusBadge";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProductListCard = ({ onMoreButtonClick }: ProdListItemProps) => {
	return (
		<ProductListCardContainer>
			<ProductImage imageUrl="/images/product.jpg" />
			<StatusContainer>
				<StatusBadge>Active</StatusBadge>
			</StatusContainer>
			<ProductTitle>Nike AF1 Homesick</ProductTitle>
			<ProductText>Rp 3.499.000</ProductText>
			<BoxButton onClick={onMoreButtonClick}>
				<MoreHorizIcon fontSize="small" />
			</BoxButton>
		</ProductListCardContainer>
	);
};

export default ProductListCard;
