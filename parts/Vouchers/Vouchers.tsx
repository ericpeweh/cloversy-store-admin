// Dependencies
import React from "react";

// Styles
import { VouchersContainer, VouchersHeader, VouchersList } from "./Vouchers.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

// Hooks
import useMenu from "../../hooks/useMenu";
import usePagination from "../../hooks/usePagination";
import useModal from "../../hooks/useModal";

// Components
import { Grid, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import Menu from "../../components/Menu/Menu";
import Pagination from "../../components/Pagination/Pagination";
import Voucher from "../../components/Voucher/Voucher";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Vouchers = () => {
	const { page, onChange: paginationChangeHandler } = usePagination();
	const {
		anchorEl: voucherItemMenuAnchorEl,
		closeHandler: voucherItemMenuCloseHandler,
		isMenuOpen: isVoucherItemMenuOpen,
		openHandler: voucherItemMenuOpenHandler
	} = useMenu();

	const {
		isOpen: isDeleteVoucherModalOpen,
		openHandler: openDeleteVoucherModalHandler,
		closeHandler: closeDeleteVoucherModalHandler
	} = useModal();

	return (
		<VouchersContainer>
			<ConfirmationModal
				modalTitle="Delete voucher"
				modalDescription="Are you sure you want to delete <voucher name>, this action can't be undone."
				onClose={closeDeleteVoucherModalHandler}
				open={isDeleteVoucherModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Vouchers List</PageTitle>
				<Button startIcon={<AddIcon />} size="small" color="primary">
					New Voucher
				</Button>
			</Stack>
			<VouchersHeader container>
				<Stack direction="row" justifyContent="flex-end" gap={2}>
					<SelectInput
						options={["Status", "Active", "Disabled"]}
						value={"Status"}
						size="small"
						sx={{ width: "20rem" }}
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={["Default sorting", "Sort by usage", "Sort by expiry date", "Sort by latest"]}
						value="Default sorting"
						size="small"
					/>
				</Stack>
			</VouchersHeader>
			<Menu
				anchorEl={voucherItemMenuAnchorEl}
				id="voucher-item-menu"
				isOpen={isVoucherItemMenuOpen}
				onClose={voucherItemMenuCloseHandler}
				items={[
					{ label: "Lihat detail", action: () => {}, id: "detail" },
					{ label: "Edit item", action: () => {}, id: "edit" },
					{
						label: <Typography color="error">Hapus</Typography>,
						action: openDeleteVoucherModalHandler,
						id: "hapus"
					}
				]}
			/>
			<VouchersList>
				<Grid container spacing={3}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
						<Grid item xs={6} key={item}>
							<Voucher
								title={"Diskon Rp 25.000"}
								expiryDate={"23 Jul 2022"}
								code={"ACBD98DC88"}
								onOpenDetail={() => {}}
								onOpenMenu={voucherItemMenuOpenHandler}
							/>
						</Grid>
					))}
				</Grid>
			</VouchersList>
			<Stack justifyContent="flex-end" direction="row" mt={4}>
				<Pagination
					page={page}
					onChange={paginationChangeHandler}
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</VouchersContainer>
	);
};

export default Vouchers;
