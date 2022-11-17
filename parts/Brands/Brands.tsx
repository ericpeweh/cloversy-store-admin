// Dependencies
import React, { useState, useEffect } from "react";

// Styles
import { BrandsContainer, BrandsHeader, BrandsList } from "./Brands.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";

// Types
import { Brand, BrandsSortValues } from "../../interfaces";
import { SelectChangeEvent } from "@mui/material";

// Hooks
import {
	useGetBrandsQuery,
	useCreateBrandMutation,
	useDeleteBrandMutation,
	useUpdateBrandMutation
} from "../../api/brand.api";
import usePagination from "../../hooks/usePagination";
import useModal from "../../hooks/useModal";
import useSelector from "../../hooks/useSelector";
import useDebounce from "../../hooks/useDebounce";

// Components
import { Link, Stack, Typography, CircularProgress } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import InputBrandModal from "../../components/InputBrandModal/InputBrandModal";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

const tableHeadData = ["Nama Brand", "Identifier", "Produk Terkait", "Tindakan"];

const Brands = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>();

	const [searchInput, setSearchInput] = useState("");
	const [sortBy, setSortBy] = useState<string>("id");
	const searchQuery = useDebounce(searchInput, 500);
	const { page, onChange: paginationChangeHandler } = usePagination();

	const {
		data: brandData,
		isFetching: isGetBrandsLoading,
		isSuccess: isGetBrandsSuccess,
		error: getBrandsError,
		refetch: refetchBrands
	} = useGetBrandsQuery(
		{ q: searchQuery, page, sortBy },
		{
			skip: !isAuth
		}
	);
	const brandsError: any = getBrandsError;
	const noDataFound = brandData?.data.brands.length === 0;

	const [
		createBrand,
		{
			isLoading: isCreateBrandLoading,
			error: createBrandError,
			isSuccess: isCreateBrandSuccess,
			reset: resetCreateBrand
		}
	] = useCreateBrandMutation();

	const [
		updateBrand,
		{
			isLoading: isUpdateBrandLoading,
			error: updateBrandError,
			isSuccess: isUpdateBrandSuccess,
			reset: resetUpdateBrand
		}
	] = useUpdateBrandMutation();

	const [
		deleteBrand,
		{
			isLoading: isDeleteBrandLoading,
			error: deleteBrandError,
			isSuccess: isDeleteBrandSuccess,
			reset: resetDeleteBrand
		}
	] = useDeleteBrandMutation();

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const sortByChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setSortBy(e.target.value as BrandsSortValues);
	};

	const {
		isOpen: isAddBrandModalOpen,
		openHandler: openAddBrandModalHandler,
		closeHandler: closeAddBrandModalHandler
	} = useModal();
	const {
		isOpen: isEditBrandModalOpen,
		openHandler: openEditBrandModalHandler,
		closeHandler: closeEditBrandModalHandler
	} = useModal();
	const {
		isOpen: isDeleteBrandModalOpen,
		openHandler: openDeleteBrandModalHandler,
		closeHandler: closeDeleteBrandModalHandler
	} = useModal();

	const createBrandHandler = (data: Partial<Brand>) => createBrand(data);

	const updateBrandHandler = (data: Partial<Brand>) => updateBrand(data);

	const deleteBrandHandler = (brandId: number) => deleteBrand(brandId);

	const setAndOpenDeleteBrandModalHandler = (brand: Brand) => {
		setSelectedBrand(brand);
		openDeleteBrandModalHandler();
	};

	const setAndOpenEditBrandModalHandler = (brand: Brand) => {
		setSelectedBrand(brand);
		openEditBrandModalHandler();
	};

	useEffect(() => {
		if (isCreateBrandSuccess) {
			paginationChangeHandler(null, 1);
			closeAddBrandModalHandler();
			resetCreateBrand();
		}
	}, [isCreateBrandSuccess, closeAddBrandModalHandler, resetCreateBrand, paginationChangeHandler]);

	useEffect(() => {
		if (isUpdateBrandSuccess) {
			closeEditBrandModalHandler();
			resetUpdateBrand();
			setSelectedBrand(undefined);
		}
	}, [isUpdateBrandSuccess, closeEditBrandModalHandler, resetUpdateBrand]);

	useEffect(() => {
		if (isDeleteBrandSuccess) {
			closeDeleteBrandModalHandler();
			resetDeleteBrand();
			setSelectedBrand(undefined);
		}
	}, [isDeleteBrandSuccess, closeDeleteBrandModalHandler, resetDeleteBrand]);

	return (
		<BrandsContainer>
			<InputBrandModal
				open={isAddBrandModalOpen}
				onClose={() => {
					resetCreateBrand();
					closeAddBrandModalHandler();
				}}
				modalTitle="Tambah Brand"
				onSubmit={createBrandHandler}
				isLoading={isCreateBrandLoading}
				error={createBrandError}
			/>
			<InputBrandModal
				open={isEditBrandModalOpen}
				onClose={() => {
					resetUpdateBrand();
					closeEditBrandModalHandler();
				}}
				modalTitle="Ubah Brand"
				onSubmit={updateBrandHandler}
				isLoading={isUpdateBrandLoading}
				brandData={selectedBrand}
				error={updateBrandError}
			/>
			<ConfirmationModal
				modalTitle="Delete Brand"
				modalDescription={`Are you sure you want to delete ${selectedBrand?.identifier}, this action can't be undone.`}
				onClose={() => {
					resetDeleteBrand();
					closeDeleteBrandModalHandler();
				}}
				open={isDeleteBrandModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
				error={deleteBrandError}
				isLoading={isDeleteBrandLoading}
				onConfirm={() => {
					if (selectedBrand) deleteBrandHandler(selectedBrand.id);
				}}
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Brand List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={openAddBrandModalHandler}
				>
					New Brand
				</Button>
			</Stack>
			<BrandsHeader>
				<Stack direction="row" sx={{ width: { xs: "100%", sm: "30rem" } }}>
					<TextInput
						label=""
						placeholder="Search Brand..."
						id="search-order"
						size="small"
						value={searchInput}
						onChange={searchQueryChangeHandler}
					/>
				</Stack>
				<Stack direction="row" justifyContent="flex-end" gap={2}>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							{ label: "Default sorting", value: "id" },
							{ label: "Sort by product amount", value: "product_amount" },
							{ label: "Sort by alphabet (A-Z)", value: "a-z" },
							{ label: "Sort by alphabet (Z-A)", value: "z-a" }
						]}
						value={sortBy}
						size="small"
						onChange={sortByChangeHandler}
					/>
				</Stack>
			</BrandsHeader>

			{!isGetBrandsLoading && getBrandsError && (
				<FallbackContainer>
					<ErrorMessage>{brandsError.data.message}</ErrorMessage>
					<BoxButton onClick={refetchBrands}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetBrandsLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetBrandsLoading && isGetBrandsSuccess && noDataFound && (
				<FallbackContainer>
					<Typography>No brand found!</Typography>
				</FallbackContainer>
			)}

			{!isGetBrandsLoading && isGetBrandsSuccess && brandData && !noDataFound && (
				<>
					<BrandsList>
						<Table headData={tableHeadData}>
							{brandData?.data.brands.map((brand: Brand) => (
								<TableRow key={brand.id}>
									<TableCell>{brand.name}</TableCell>
									<TableCell>{brand.identifier}</TableCell>
									<TableCell>
										<Link>
											<Typography
												sx={{
													cursor: "pointer",
													fontWeight: 500,
													fontSize: {
														xs: "1.4rem",
														sm: "1.5rem",
														md: "1.6rem"
													}
												}}
											>
												{brand.product_amount} Produk
											</Typography>
										</Link>
									</TableCell>
									<TableCell>
										<Stack direction="row" gap={1}>
											<BoxButton onClick={() => setAndOpenEditBrandModalHandler(brand)}>
												Edit
											</BoxButton>
											<Button
												color="error"
												size="small"
												onClick={() => setAndOpenDeleteBrandModalHandler(brand)}
											>
												<DeleteIcon />
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</Table>
					</BrandsList>
					<Stack
						justifyContent="flex-end"
						direction="row"
						mt={{ xs: 3, md: 4 }}
						sx={{
							"@media screen and (max-width: 800px)": {
								justifyContent: "center"
							}
						}}
					>
						<Pagination
							page={page}
							onChange={paginationChangeHandler}
							count={brandData.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</>
			)}
		</BrandsContainer>
	);
};

export default Brands;
