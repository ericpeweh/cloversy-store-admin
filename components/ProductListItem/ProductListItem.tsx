// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import {
	ProductImage,
	ProductListItemContainer,
	ProductText,
	ProductTitle
} from "./ProductListItem.styles";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Types
import { Product } from "../../interfaces";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Components
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	productData: Product;
}

const ProductListItem = ({ onMoreButtonClick, productData }: ProdListItemProps) => {
	const { wWidth } = useWindowSize();
	const router = useRouter();

	const openProductDetailHandler = () => {
		router.push(`products/${productData.id}`);
	};

	return (
		<ProductListItemContainer container alignItems="center" rowSpacing={1}>
			<Grid item xs={wWidth < 700 ? 12 : wWidth < 1000 ? 7 : 4}>
				<Stack direction="row" gap={1} alignItems="center">
					<ProductImage>
						<Image
							src={productData.image || "/images/no-image.png"}
							alt="product"
							layout="responsive"
							width={1080}
							height={1080}
						/>
					</ProductImage>
					<ProductTitle onClick={openProductDetailHandler}>{productData.title}</ProductTitle>
				</Stack>
			</Grid>
			<Grid item xs={wWidth < 700 ? 3 : 2}>
				<ProductText>{formatToRupiah(productData.price)}</ProductText>
			</Grid>
			<Grid item xs={wWidth < 700 ? 3 : 2}>
				<Stack justifyContent="flex-end">
					<ProductText
						sx={{
							"@media screen and (max-width: 700px)": {
								margin: "auto"
							}
						}}
					>
						<StatusBadge color={productData.status === "disabled" ? "error" : "primary"}>
							{productData.status}
						</StatusBadge>
					</ProductText>
				</Stack>
			</Grid>
			{(wWidth > 1000 || wWidth < 700) && (
				<Grid item xs={wWidth < 700 ? 3 : 2}>
					<ProductText
						sx={{
							"@media screen and (max-width: 700px)": {
								margin: "auto"
							}
						}}
					>
						{productData.brand}
					</ProductText>
				</Grid>
			)}
			<Grid item xs={wWidth < 700 ? 3 : wWidth < 1000 ? 1 : 2}>
				<Stack justifyContent="flex-end" direction="row" gap={1}>
					{wWidth > 1000 && (
						<BoxButton onClick={openProductDetailHandler}>
							Detail{wWidth > 1600 && " produk"}
						</BoxButton>
					)}
					<BoxButton onClick={onMoreButtonClick}>
						<MoreHorizIcon fontSize="small" />
					</BoxButton>
				</Stack>
			</Grid>
		</ProductListItemContainer>
	);
};

export default ProductListItem;
