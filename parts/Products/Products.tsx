// Dependencies
import React, { useEffect, useMemo, useState } from "react";

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

// Types
import { Brand, ProductsSortValues, ProductStatusValues } from "../../interfaces";

// Hooks
import usePagination from "../../hooks/usePagination";
import useMenu from "../../hooks/useMenu";
import useDebounce from "../../hooks/useDebounce";
import useSelector from "../../hooks/useSelector";
import { useRouter } from "next/router";
import { useGetProductsQuery } from "../../api/product.api";
import { useGetBrandsQuery } from "../../api/brand.api";

// Components
import {
	CircularProgress,
	Divider,
	Grid,
	SelectChangeEvent,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import ProductListCard from "../../components/ProductListCard/ProductListCard";
import TextInput from "../../components/TextInput/TextInput";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import BoxButton from "../../components/BoxButton/BoxButton";

type DisplayModeType = "list" | "card";

const Products = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { brand: brandIdQuery } = router.query;
	const [displayMode, setDisplayMode] = useState<DisplayModeType>("card");
	const [searchInput, setSearchInput] = useState("");
	const [brandFilter, setBrandFilter] = useState(-1);
	const [sortBy, setSortBy] = useState<string>("id");
	const [statusFilter, setStatusFilter] = useState<ProductStatusValues>("default");
	const searchQuery = useDebounce(searchInput, 500);
	const { page, onChange: paginationChangeHandler } = usePagination();

	useEffect(() => {
		if (brandIdQuery) {
			setBrandFilter(+brandIdQuery);
		}
	}, [brandIdQuery]);

	const {
		anchorEl: productItemMenuAnchorEl,
		anchorElData: productItemMenuAnchorElData,
		closeHandler: productItemMenuCloseHandler,
		isMenuOpen: isProductItemMenuOpen,
		openHandler: productItemMenuOpenHandler
	} = useMenu();

	const {
		data: productsData,
		isFetching: isGetProductsLoading,
		isSuccess: isGetProductsSuccess,
		error: getProductsError,
		refetch: refetchProducts
	} = useGetProductsQuery(
		{ q: searchQuery, page, sortBy, statusFilter, brandFilter },
		{
			skip: !isAuth
		}
	);
	const productsError: any = getProductsError;
	const noDataFound = productsData?.data.products.length === 0;

	const {
		data: brandsData,
		isFetching: isGetBrandsLoading,
		isSuccess: isGetBrandsSuccess,
		error: getBrandsError
	} = useGetBrandsQuery(
		{ q: "", page: "", sortBy: "" },
		{
			skip: !isAuth
		}
	);

	const brandOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			brandsData?.data.brands
				?.filter((brand: Brand) => brand.product_amount !== "0")
				.map((brand: Brand) => ({
					label: `${brand.name} (${brand.product_amount})`,
					value: brand.id
				})) || [];

		return [{ label: "All brand", value: -1 }, ...availableOptions];
	}, [brandsData?.data.brands]);

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const sortByChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setSortBy(e.target.value as ProductsSortValues);
	};

	const statusFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setStatusFilter(e.target.value as ProductStatusValues);
	};

	const brandFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setBrandFilter(parseInt(e.target.value + ""));
	};

	const displayModeChangeHandler = (_: React.SyntheticEvent, newDisplayMode: DisplayModeType) => {
		if (newDisplayMode !== null) {
			setDisplayMode(newDisplayMode);
		}
	};

	return (
		<ProductsContainer>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Products List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={() => router.push("/products/new")}
				>
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
					<TextInput
						label=""
						placeholder="Search product..."
						id="search-product"
						size="small"
						value={searchInput}
						onChange={searchQueryChangeHandler}
					/>
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
						options={brandOptions}
						value={brandFilter}
						size="small"
						onChange={brandFilterChangeHandler}
					/>
					<SelectInput
						options={[
							{ label: "Show all", value: "default" },
							{ label: "Active", value: "active" },
							{ label: "Disabled", value: "disabled" }
						]}
						value={statusFilter}
						onChange={statusFilterChangeHandler}
						size="small"
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							{ label: "Default sorting", value: "id" },
							{ label: "Sort by popularity", value: "popularity" },
							{ label: "Sort by rating", value: "rating" },
							{ label: "Sort by price: low to high", value: "low-to-high" },
							{ label: "Sort by price: high to low", value: "high-to-low" }
						]}
						value={sortBy}
						onChange={sortByChangeHandler}
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
					{
						label: "Lihat detail",
						action: () => router.push(`/products/${productItemMenuAnchorElData?.id}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/products/${productItemMenuAnchorElData?.id}/edit`),
						id: "edit"
					}
				]}
			/>
			{!isGetProductsLoading && getProductsError && (
				<FallbackContainer>
					<ErrorMessage>{productsError.data?.message}</ErrorMessage>
					<BoxButton onClick={refetchProducts}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetProductsLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetProductsLoading && isGetProductsSuccess && noDataFound && (
				<FallbackContainer>
					<Typography>No product found!</Typography>
				</FallbackContainer>
			)}

			{!isGetProductsLoading && isGetProductsSuccess && productsData && !noDataFound && (
				<>
					{displayMode === "list" ? (
						<ProductsList>
							{productsData.data.products.map((product, currIndex, arr) => (
								<React.Fragment key={product.id}>
									<ProductListItem
										onMoreButtonClick={e => productItemMenuOpenHandler(e, product)}
										productData={product}
									/>
									{currIndex !== arr.length - 1 && <Divider />}
								</React.Fragment>
							))}
						</ProductsList>
					) : (
						<ProductsCardList>
							<Grid container spacing={{ xs: 1, sm: 2, lg: 3 }}>
								{productsData.data.products.map(product => (
									<Grid item xs={6} md={4} xl={3} key={product.id}>
										<ProductListCard
											onMoreButtonClick={e => productItemMenuOpenHandler(e, product)}
											productData={product}
										/>
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
							count={productsData.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</>
			)}
		</ProductsContainer>
	);
};

export default Products;
