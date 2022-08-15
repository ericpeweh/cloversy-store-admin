// Dependencies
import React from "react";

// Styles
import {
	ProductImage,
	ProductListItemContainer,
	ProductText,
	ProductTitle
} from "./ProductListItem.styles";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Dependencies
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProductListItem = ({ onMoreButtonClick }: ProdListItemProps) => {
	return (
		<ProductListItemContainer container alignItems="center">
			<Grid item xs={4}>
				<Stack direction="row" gap={1} alignItems="center">
					<ProductImage>
						<Image
							src="/images/product.jpg"
							alt="product"
							layout="responsive"
							width={1080}
							height={1080}
						/>
					</ProductImage>
					<ProductTitle>Nike AF1 Homesick - Limited Edition</ProductTitle>
				</Stack>
			</Grid>
			<Grid item xs={2}>
				<ProductText>Rp 3.499.000</ProductText>
			</Grid>
			<Grid item xs={2}>
				<Stack justifyContent="flex-end">
					<ProductText>
						<StatusBadge>Active</StatusBadge>
					</ProductText>
				</Stack>
			</Grid>
			<Grid item xs={2}>
				<ProductText>Nike</ProductText>
			</Grid>
			<Grid item xs={2}>
				<Stack justifyContent="flex-end" direction="row" gap={1}>
					<BoxButton>Detail produk</BoxButton>
					<BoxButton onClick={onMoreButtonClick}>
						<MoreHorizIcon fontSize="small" />
					</BoxButton>
				</Stack>
			</Grid>
		</ProductListItemContainer>
	);
};

export default ProductListItem;
