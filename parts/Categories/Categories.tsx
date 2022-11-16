// Dependencies
import React, { useEffect, useState } from "react";

// Styles
import { CategoriesContainer, CategoriesHeader, CategoriesList } from "./Categories.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";

// Types
import { Category, CategoriesSortValues } from "../../interfaces";
import { SelectChangeEvent } from "@mui/material";

// Hooks
import usePagination from "../../hooks/usePagination";
import useSelector from "../../hooks/useSelector";
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";
import {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation
} from "../../api/category.api";

// Components
import { Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import InputCategoryModal from "../../components/InputCategoryModal/InputCategoryModal";

const tableHeadData = ["Kategori", "Deskripsi", "Identifier", "Produk", "Tindakan"];

const Categories = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
	const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
	const [searchInput, setSearchInput] = useState("");
	const [sortBy, setSortBy] = useState<string>("id");
	const searchQuery = useDebounce(searchInput, 500);
	const { page, onChange: paginationChangeHandler } = usePagination();

	const {
		data: categoryData,
		isLoading: isGetCategoriesLoading,
		isSuccess: isGetCategoriesSuccess,
		isError: isGetCategoriesError,
		error: getCategoriesError
	} = useGetCategoriesQuery(
		{ q: searchQuery, page, sortBy },
		{
			skip: !isAuth
		}
	);

	const [
		createCategory,
		{
			isLoading: isCreateCategoryLoading,
			error: createCategoryError,
			isSuccess: isCreateCategorySuccess,
			reset: resetCreateCategory
		}
	] = useCreateCategoryMutation();

	const [
		updateCategory,
		{
			isLoading: isUpdateCategoryLoading,
			error: updateCategoryError,
			isSuccess: isUpdateCategorySuccess,
			reset: resetUpdateCategory
		}
	] = useUpdateCategoryMutation();

	const [
		deleteCategory,
		{
			isLoading: isDeleteCategoryLoading,
			error: deleteCategoryError,
			isSuccess: isDeleteCategorySuccess,
			reset: resetDeleteCategory
		}
	] = useDeleteCategoryMutation();

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const sortByChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setSortBy(e.target.value as CategoriesSortValues);
	};

	const {
		isOpen: isAddCategoryModalOpen,
		openHandler: openAddCategoryModalHandler,
		closeHandler: closeAddCategoryModalHandler
	} = useModal();
	const {
		isOpen: isEditCategoryModalOpen,
		openHandler: openEditCategoryModalHandler,
		closeHandler: closeEditCategoryModalHandler
	} = useModal();
	const {
		isOpen: isDeleteCategoryModalOpen,
		openHandler: openDeleteCategoryModalHandler,
		closeHandler: closeDeleteCategoryModalHandler
	} = useModal();

	const createCategoryHandler = (data: Partial<Category>) => createCategory(data);

	const updateCategoryHandler = (data: Partial<Category>) => updateCategory(data);

	const deleteCategoryHandler = (categoryId: number) => deleteCategory(categoryId);

	const setAndOpenDeleteCategoryModalHandler = (category: Category) => {
		setSelectedCategory(category);
		openDeleteCategoryModalHandler();
	};

	const setAndOpenEditCategoryModalHandler = (category: Category) => {
		setSelectedCategory(category);
		openEditCategoryModalHandler();
	};

	useEffect(() => {
		if (isCreateCategorySuccess) {
			paginationChangeHandler(null, 1);
			closeAddCategoryModalHandler();
			resetCreateCategory();
		}
	}, [
		isCreateCategorySuccess,
		closeAddCategoryModalHandler,
		resetCreateCategory,
		paginationChangeHandler
	]);

	useEffect(() => {
		if (isUpdateCategorySuccess) {
			closeEditCategoryModalHandler();
			resetUpdateCategory();
			setSelectedCategory(undefined);
		}
	}, [isUpdateCategorySuccess, closeEditCategoryModalHandler, resetUpdateCategory]);

	useEffect(() => {
		if (isDeleteCategorySuccess) {
			closeDeleteCategoryModalHandler();
			resetDeleteCategory();
			setSelectedCategory(undefined);
		}
	}, [isDeleteCategorySuccess, closeDeleteCategoryModalHandler, resetDeleteCategory]);

	return (
		<CategoriesContainer>
			<InputCategoryModal
				open={isAddCategoryModalOpen}
				onClose={closeAddCategoryModalHandler}
				modalTitle="Tambah Kategori"
				onSubmit={createCategoryHandler}
				isLoading={isCreateCategoryLoading}
			/>
			<InputCategoryModal
				open={isEditCategoryModalOpen}
				onClose={closeEditCategoryModalHandler}
				modalTitle="Ubah Kategori"
				onSubmit={updateCategoryHandler}
				isLoading={isUpdateCategoryLoading}
				categoryData={selectedCategory}
			/>
			<ConfirmationModal
				modalTitle="Delete category"
				modalDescription={`Are you sure you want to delete category ${selectedCategory?.identifier} ?, this action can't be undone.`}
				onClose={closeDeleteCategoryModalHandler}
				open={isDeleteCategoryModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
				isLoading={isDeleteCategoryLoading}
				onConfirm={() => {
					if (selectedCategory) deleteCategoryHandler(selectedCategory.id);
				}}
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Category List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={openAddCategoryModalHandler}
				>
					New Category
				</Button>
			</Stack>
			<CategoriesHeader>
				<Stack direction="row" sx={{ width: { xs: "100%", sm: "30rem" } }}>
					<TextInput
						label=""
						placeholder="Search category..."
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
							{ label: "Sort by product number", value: "product_amount" },
							{ label: "Sort by alphabet (A-Z)", value: "a-z" },
							{ label: "Sort by alphabet (Z-A)", value: "z-a" }
						]}
						value={sortBy}
						size="small"
						onChange={sortByChangeHandler}
					/>
				</Stack>
			</CategoriesHeader>

			{isGetCategoriesSuccess && categoryData && (
				<>
					<CategoriesList>
						<Table headData={tableHeadData}>
							{categoryData.data.categories.map((category: Category) => (
								<TableRow key={category.id}>
									<TableCell>{category.name}</TableCell>
									<TableCell>{category.description}</TableCell>
									<TableCell>{category.identifier}</TableCell>
									<TableCell>{category.product_amount}</TableCell>
									<TableCell>
										<Stack direction="row" gap={1}>
											<BoxButton onClick={() => setAndOpenEditCategoryModalHandler(category)}>
												Edit
											</BoxButton>
											<Button
												color="error"
												size="small"
												onClick={() => setAndOpenDeleteCategoryModalHandler(category)}
											>
												<DeleteIcon />
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</Table>
					</CategoriesList>
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
						{categoryData && (
							<Pagination
								page={page}
								onChange={paginationChangeHandler}
								count={categoryData.totalPages || 1}
								shape="rounded"
								color="primary"
							/>
						)}
					</Stack>
				</>
			)}
		</CategoriesContainer>
	);
};

export default Categories;
