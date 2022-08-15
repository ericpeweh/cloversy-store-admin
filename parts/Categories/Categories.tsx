// Dependencies
import React from "react";

// Styles
import { CategoriesContainer, CategoriesHeader, CategoriesList } from "./Categories.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";

// Hooks
import usePagination from "../../hooks/usePagination";

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
import useModal from "../../hooks/useModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import InputCategoryModal from "../../components/InputCategoryModal/InputCategoryModal";

const tableHeadData = ["Kategori", "Deskripsi", "Identifier", "Produk", "Tindakan"];

const CategoriesData = [
	{
		id: 1,
		kategori: "Sneaker High",
		deskripsi: "Lorem ipsum dolor, sit amet",
		identifier: "/sneaker-high",
		produk: 12
	},
	{
		id: 2,
		kategori: "Slip On",
		deskripsi: "Lorem ipsum dolor, sit amet",
		identifier: "/slip-on",
		produk: 8
	},
	{
		id: 3,
		kategori: "Sneaker Low",
		deskripsi: "Lorem ipsum dolor, sit amet",
		identifier: "/sneaker-low",
		produk: 25
	},
	{
		id: 4,
		kategori: "Boots",
		deskripsi: "Lorem ipsum dolor, sit amet",
		identifier: "/boots",
		produk: 2
	},
	{
		id: 5,
		kategori: "Canvas",
		deskripsi: "Lorem ipsum dolor, sit amet",
		identifier: "/canvas",
		produk: 17
	}
];

const Categories = () => {
	const { page, onChange: paginationChangeHandler } = usePagination();

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

	return (
		<CategoriesContainer>
			<InputCategoryModal
				open={isAddCategoryModalOpen}
				onClose={closeAddCategoryModalHandler}
				modalTitle="Tambah Kategori"
			/>
			<InputCategoryModal
				open={isEditCategoryModalOpen}
				onClose={closeEditCategoryModalHandler}
				modalTitle="Ubah Kategori"
			/>
			<ConfirmationModal
				modalTitle="Delete category"
				modalDescription="Are you sure you want to delete <category>, this action can't be undone."
				onClose={closeDeleteCategoryModalHandler}
				open={isDeleteCategoryModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Category List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={openAddCategoryModalHandler}
				>
					New Category
				</Button>
			</Stack>
			<CategoriesHeader container>
				<Stack direction="row" sx={{ width: "30rem" }}>
					<TextInput label="" placeholder="Search category..." id="search-order" size="small" />
				</Stack>
				<Stack direction="row" justifyContent="flex-end" gap={2}>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							"Default sorting",
							"Sort by product number",
							"Sort by alphabet (A-Z)",
							"Sort by alphabet (Z-A)"
						]}
						value="Default sorting"
						size="small"
					/>
				</Stack>
			</CategoriesHeader>

			<CategoriesList>
				<Table headData={tableHeadData}>
					{CategoriesData.map(data => (
						<TableRow key={data.id}>
							<TableCell>{data.kategori}</TableCell>
							<TableCell>{data.deskripsi}</TableCell>
							<TableCell>{data.identifier}</TableCell>
							<TableCell>{data.produk}</TableCell>
							<TableCell>
								<Stack direction="row" gap={1}>
									<BoxButton onClick={openEditCategoryModalHandler}>Edit</BoxButton>
									<Button color="error" size="small" onClick={openDeleteCategoryModalHandler}>
										<DeleteIcon />
									</Button>
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</Table>
			</CategoriesList>
			<Stack justifyContent="flex-end" direction="row" mt={4}>
				<Pagination
					page={page}
					onChange={paginationChangeHandler}
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</CategoriesContainer>
	);
};

export default Categories;
