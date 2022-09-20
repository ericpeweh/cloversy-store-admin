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

// Components
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

interface ProdListItemProps {
	onMoreButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProductListItem = ({ onMoreButtonClick }: ProdListItemProps) => {
	const { wWidth } = useWindowSize();

	return (
		<ProductListItemContainer container alignItems="center" rowSpacing={1}>
			<Grid item xs={wWidth < 700 ? 12 : wWidth < 1000 ? 7 : 4}>
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
			<Grid item xs={wWidth < 700 ? 3 : 2}>
				<ProductText>Rp 3.499.000</ProductText>
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
						<StatusBadge>Active</StatusBadge>
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
						Nike
					</ProductText>
				</Grid>
			)}
			<Grid item xs={wWidth < 700 ? 3 : wWidth < 1000 ? 1 : 2}>
				<Stack justifyContent="flex-end" direction="row" gap={1}>
					{wWidth > 1000 && <BoxButton>Detail{wWidth > 1500 && " produk"}</BoxButton>}
					<BoxButton onClick={onMoreButtonClick}>
						<MoreHorizIcon fontSize="small" />
					</BoxButton>
				</Stack>
			</Grid>
		</ProductListItemContainer>
	);
};

export default ProductListItem;
