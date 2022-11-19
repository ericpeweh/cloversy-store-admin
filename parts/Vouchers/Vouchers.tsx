// Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";

// Styles
import { VouchersContainer, VouchersHeader, VouchersList } from "./Vouchers.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

// Hooks
import useMenu from "../../hooks/useMenu";
import usePagination from "../../hooks/usePagination";
import useSelector from "../../hooks/useSelector";
import { useGetVouchersQuery } from "../../api/voucher.api";

// Types
import { VouchersStatusValues, VouchersSortValues } from "../../interfaces";
import { SelectChangeEvent } from "@mui/material";

// Utils
import { formatDateFullMonth } from "../../utils/formatDate";

// Components
import { CircularProgress, Grid, Stack, Typography, Snackbar } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import Menu from "../../components/Menu/Menu";
import Pagination from "../../components/Pagination/Pagination";
import Voucher from "../../components/Voucher/Voucher";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import BoxButton from "../../components/BoxButton/BoxButton";

const Vouchers = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { page, onChange: paginationChangeHandler } = usePagination();
	const [sortBy, setSortBy] = useState<string>("id");
	const [statusFilter, setStatusFilter] = useState<VouchersStatusValues>("default");
	const [successCopy, setSuccessCopy] = useState(false);

	const {
		data: vouchersData,
		isFetching: isGetVouchersLoading,
		isSuccess: isGetVouchersSuccess,
		error: getVouchersError,
		refetch: refetchVouchers
	} = useGetVouchersQuery(
		{ page, statusFilter, sortBy },
		{
			skip: !isAuth
		}
	);
	const vouchersError: any = getVouchersError;
	const noDataFound = vouchersData?.data.vouchers.length === 0;

	const sortByChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setSortBy(e.target.value as VouchersSortValues);
	};

	const statusFilterChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setStatusFilter(e.target.value as VouchersStatusValues);
	};

	const copyVoucherCodeHandler = async (voucherCode: string) => {
		await navigator.clipboard.writeText(voucherCode);
		setSuccessCopy(true);
	};

	const {
		anchorEl: voucherItemMenuAnchorEl,
		anchorElData: voucherItemMenuAnchorElData,
		closeHandler: voucherItemMenuCloseHandler,
		isMenuOpen: isVoucherItemMenuOpen,
		openHandler: voucherItemMenuOpenHandler
	} = useMenu();

	return (
		<VouchersContainer>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopy}
				onClose={() => setSuccessCopy(false)}
				message="Voucher code copied!"
				key={"voucher_code_copy"}
				autoHideDuration={1500}
			/>

			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Vouchers List</PageTitle>
				<Button
					startIcon={<AddIcon />}
					size="small"
					color="primary"
					onClick={() => router.push("/vouchers/new")}
				>
					New Voucher
				</Button>
			</Stack>
			<VouchersHeader container>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					sx={{ width: { xs: "100%", sm: "auto" } }}
					gap={{ xs: 1, sm: 2 }}
				>
					<SelectInput
						options={[
							{ label: "Show all", value: "default" },
							{ label: "Active", value: "active" },
							{ label: "Disabled", value: "disabled" }
						]}
						value={statusFilter}
						onChange={statusFilterChangeHandler}
						size="small"
						sx={{ width: { xs: "100%", sm: "20rem" } }}
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							{ label: "Default sorting", value: "id" },
							{ label: "Sort by usage", value: "current_usage" },
							{ label: "Sort by expiry date", value: "expiry_date" }
						]}
						value={sortBy}
						onChange={sortByChangeHandler}
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
					{
						label: "Lihat detail",
						action: () => router.push(`/vouchers/${voucherItemMenuAnchorElData?.code}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/vouchers/${voucherItemMenuAnchorElData?.code}/edit`),
						id: "edit"
					}
				]}
			/>
			{!isGetVouchersLoading && getVouchersError && (
				<FallbackContainer>
					<ErrorMessage>{vouchersError.data.message}</ErrorMessage>
					<BoxButton onClick={refetchVouchers}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetVouchersLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetVouchersLoading && isGetVouchersSuccess && noDataFound && (
				<FallbackContainer>
					<Typography>No voucher found!</Typography>
				</FallbackContainer>
			)}

			{!isGetVouchersLoading && isGetVouchersSuccess && vouchersData && !noDataFound && (
				<>
					<VouchersList>
						<Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
							{vouchersData?.data.vouchers.map(voucher => (
								<Grid item xs={12} md={6} key={voucher.code}>
									<Voucher
										title={voucher.title}
										expiryDate={
											voucher.expiry_date
												? formatDateFullMonth(voucher.expiry_date)
												: "No date provided"
										}
										code={voucher.code}
										onOpenDetail={() => router.push(`/vouchers/${voucher.code}`)}
										onOpenMenu={e => voucherItemMenuOpenHandler(e, voucher)}
										onCopyCode={copyVoucherCodeHandler}
									/>
								</Grid>
							))}
						</Grid>
					</VouchersList>
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
							page={vouchersData?.page}
							onChange={paginationChangeHandler}
							count={vouchersData?.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</>
			)}
		</VouchersContainer>
	);
};

export default Vouchers;
