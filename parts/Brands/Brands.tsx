// Dependencies
import React from "react";

// Styles
import { BrandsContainer, BrandsHeader, BrandsList } from "./Brands.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";

// Hooks
import usePagination from "../../hooks/usePagination";

// Components
import { Link, Stack, Typography } from "@mui/material";
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
import InputBrandModal from "../../components/InputBrandModal/InputBrandModal";

const tableHeadData = ["Nama Brand", "Identifier", "Produk Terkait", "Tindakan"];

const BrandsData = [
	{
		id: 1,
		brand: "Nike",
		identifier: "nike",
		produk: 40
	},
	{
		id: 2,
		brand: "Adidas",
		identifier: "adidas",
		produk: 12
	},
	{
		id: 3,
		brand: "Ventela",
		identifier: "ventela",
		produk: 30
	},
	{
		id: 4,
		brand: "Patrobas",
		identifier: "patrobas",
		produk: 24
	},
	{
		id: 5,
		brand: "NAH Project",
		identifier: "nah_project",
		produk: 17
	}
];

const Brands = () => {
	const { page, onChange: paginationChangeHandler } = usePagination();

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

	return (
		<BrandsContainer>
			<InputBrandModal
				open={isAddBrandModalOpen}
				onClose={closeAddBrandModalHandler}
				modalTitle="Tambah Brand"
			/>
			<InputBrandModal
				open={isEditBrandModalOpen}
				onClose={closeEditBrandModalHandler}
				modalTitle="Ubah Brand"
			/>
			<ConfirmationModal
				modalTitle="Delete Brand"
				modalDescription="Are you sure you want to delete <brand name>, this action can't be undone."
				onClose={closeDeleteBrandModalHandler}
				open={isDeleteBrandModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Brand List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={openAddBrandModalHandler}
				>
					New Brand
				</Button>
			</Stack>
			<BrandsHeader container>
				<Stack direction="row" sx={{ width: "30rem" }}>
					<TextInput label="" placeholder="Search Brand..." id="search-order" size="small" />
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
			</BrandsHeader>

			<BrandsList>
				<Table headData={tableHeadData}>
					{BrandsData.map(data => (
						<TableRow key={data.id}>
							<TableCell>{data.brand}</TableCell>
							<TableCell>{data.identifier}</TableCell>
							<TableCell>
								<Link>
									<Typography sx={{ cursor: "pointer", fontWeight: 500 }}>
										{data.produk} Produk
									</Typography>
								</Link>
							</TableCell>
							<TableCell>
								<Stack direction="row" gap={1}>
									<BoxButton onClick={openEditBrandModalHandler}>Edit</BoxButton>
									<Button color="error" size="small" onClick={openDeleteBrandModalHandler}>
										<DeleteIcon />
									</Button>
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</Table>
			</BrandsList>
			<Stack justifyContent="flex-end" direction="row" mt={4}>
				<Pagination
					page={page}
					onChange={paginationChangeHandler}
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</BrandsContainer>
	);
};

export default Brands;
