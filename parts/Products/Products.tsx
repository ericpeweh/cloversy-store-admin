// Dependencies
import React, { useState } from "react";

// Styles
import {
	ProductsCardList,
	ProductsContainer,
	ProductsHeader,
	ProductsList
} from "./Products.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Hooks
import usePagination from "../../hooks/usePagination";
import useMenu from "../../hooks/useMenu";

// Components
import { Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import ProductListCard from "../../components/ProductListCard/ProductListCard";
import TextInput from "../../components/TextInput/TextInput";

type DisplayModeType = "list" | "card";

const Products = () => {
	const [displayMode, setDisplayMode] = useState<DisplayModeType>("card");
	const { page, onChange: paginationChangeHandler } = usePagination();
	const {
		anchorEl: productItemMenuAnchorEl,
		closeHandler: productItemMenuCloseHandler,
		isMenuOpen: isProductItemMenuOpen,
		openHandler: productItemMenuOpenHandler
	} = useMenu();

	const displayModeChangeHandler = (_: React.SyntheticEvent, newDisplayMode: DisplayModeType) => {
		if (newDisplayMode !== null) {
			setDisplayMode(newDisplayMode);
		}
	};

	return (
		<ProductsContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Products List</PageTitle>
				<Button startIcon={<AddIcon />} size="small" color="primary">
					New Product
				</Button>
			</Stack>
			<ProductsHeader>
				<Stack
					direction="row"
					gap={2}
					sx={{
						width: "30rem",
						"@media screen and (max-width: 1480px)": {
							width: "100%"
						}
					}}
				>
					<TextInput label="" placeholder="Search product..." id="search-product" size="small" />
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
					gap={{ xs: 1, sm: 2 }}
					sx={{
						"@media screen and (max-width: 800px)": {
							flexDirection: "column"
						}
					}}
				>
					<SelectInput
						options={[
							"All Brands",
							"Nike",
							"Adidas",
							"Ventela",
							"Patrobas",
							"NAH Project",
							"Lainnya"
						]}
						value={"All Brands"}
						size="small"
					/>
					<SelectInput options={["Status", "Active", "Disabled"]} value={"Status"} size="small" />
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							"Default sorting",
							"Sort by popularity",
							"Sort by rating",
							"Sort by latest",
							"Sort by price: low to high",
							"Sort by price: high to low"
						]}
						value="Default sorting"
						size="small"
						sx={{
							width: { xs: "100%", xl: "20rem" },
							mr: {
								xs: "0",
								md: "20rem"
							}
						}}
					/>
					<ToggleButtonGroup
						value={displayMode}
						exclusive
						onChange={displayModeChangeHandler}
						aria-label="products display mode"
						sx={{
							border: "none",
							"@media screen and (max-width: 800px)": {
								justifyContent: "center"
							}
						}}
					>
						<ToggleButton value="card" size="small" sx={{ border: "none" }}>
							<GridViewIcon />
						</ToggleButton>
						<ToggleButton value="list" size="small" sx={{ border: "none" }}>
							<TableRowsIcon />
						</ToggleButton>
					</ToggleButtonGroup>
				</Stack>
			</ProductsHeader>
			<Menu
				anchorEl={productItemMenuAnchorEl}
				id="product-item-menu"
				isOpen={isProductItemMenuOpen}
				onClose={productItemMenuCloseHandler}
				items={[
					{ label: "Lihat detail", action: () => {}, id: "detail" },
					{ label: "Edit item", action: () => {}, id: "edit" },
					{ label: "Hapus", action: () => {}, id: "hapus" }
				]}
			/>
			{displayMode === "list" ? (
				<ProductsList>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
						<React.Fragment key={item}>
							<ProductListItem onMoreButtonClick={productItemMenuOpenHandler} />
							<Divider />
						</React.Fragment>
					))}
				</ProductsList>
			) : (
				<ProductsCardList>
					<Grid container spacing={{ xs: 1, sm: 2, lg: 3 }}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
							<Grid item xs={6} md={4} xl={3} key={item}>
								<ProductListCard onMoreButtonClick={productItemMenuOpenHandler} />
							</Grid>
						))}
					</Grid>
				</ProductsCardList>
			)}

			<Stack
				justifyContent="flex-end"
				direction="row"
				mt={4}
				sx={{
					"@media screen and (max-width: 800px)": {
						justifyContent: "center"
					}
				}}
			>
				<Pagination
					page={page}
					onChange={paginationChangeHandler}
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</ProductsContainer>
	);
};

export default Products;
