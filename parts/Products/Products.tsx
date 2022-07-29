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
				<PageTitle>Products List</PageTitle>
				<Button startIcon={<AddIcon />} size="small" color="primary">
					New Product
				</Button>
			</Stack>
			<ProductsHeader container>
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
					sx={{ width: "30rem" }}
				/>
				<Stack direction="row" justifyContent="flex-end" gap={2}>
					<SelectInput
						options={["Status", "Active", "Disabled"]}
						value={"Status"}
						size="small"
						sx={{ width: "20rem" }}
					/>
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
					/>
					<ToggleButtonGroup
						value={displayMode}
						exclusive
						onChange={displayModeChangeHandler}
						aria-label="products display mode"
						sx={{ border: "none" }}
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
					{ label: <Typography color="error">Hapus</Typography>, action: () => {}, id: "hapus" }
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
					<Grid container spacing={3}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
							<Grid item xs={3} key={item}>
								<ProductListCard onMoreButtonClick={productItemMenuOpenHandler} />
							</Grid>
						))}
					</Grid>
				</ProductsCardList>
			)}

			<Stack justifyContent="flex-end" direction="row" mt={4}>
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