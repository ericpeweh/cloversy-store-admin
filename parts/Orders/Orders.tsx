// Dependencies
import React, { useEffect, useState } from "react";

// Styles
import { OrdersContainer, OrdersHeader, OrdersList } from "./Orders.styles";

// Icons
import SortIcon from "@mui/icons-material/Sort";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Utils
import { formatDateStandard } from "../../utils/formatDate";
import formatToRupiah from "../../utils/formatToRupiah";
import getOrderStatus from "../../utils/getOrderStatus";

// Types
import { TransactionSortValues, TransactionStatus } from "../../interfaces";

// Hooks
import usePagination from "../../hooks/usePagination";
import useMenu from "../../hooks/useMenu";
import useSelector from "../../hooks/useSelector";
import useDebounce from "../../hooks/useDebounce";
import { useGetTransactionsQuery } from "../../api/transaction.api";
import { useRouter } from "next/router";

// Components
import { Alert, CircularProgress, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

const tableHeadData = [
	"Tanggal Order",
	"No Pesanan",
	"Nama",
	"Email",
	"Total Pesanan",
	"Status",
	"Tindakan"
];

const _statusFilterOptions = [
	{ label: "Semua pesanan", value: "default" },
	{ label: "Pending", value: "pending" },
	{ label: "Proses", value: "process" },
	{ label: "Dikirim", value: "sent" },
	{ label: "Selesai", value: "success" },
	{ label: "Dibatalkan", value: "cancel" }
];

const _sortValues = [
	{ label: "Default sorting", value: "default" },
	{ label: "Sort by order number", value: "id" },
	{ label: "Sort by status", value: "order_status" },
	{ label: "Sort by total: low to high", value: "low-to-high" },
	{ label: "Sort by total: high to low", value: "high-to-low" }
];

const Orders = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);
	const [statusFilter, setStatusFilter] = useState<TransactionStatus | "default">("default");
	const [searchInput, setSearchInput] = useState("");
	const [sortBy, setSortBy] = useState<TransactionSortValues>("default");
	const searchQuery = useDebounce(searchInput, 500);

	const { page, onChange: paginationChangeHandler } = usePagination({ autoScroll: true });

	// Reset pagination to page 1 if search query changed
	useEffect(() => {
		if (searchQuery) {
			paginationChangeHandler(null, 1);
		}
	}, [paginationChangeHandler, searchQuery]);

	const {
		anchorEl: orderItemMenuAnchorEl,
		anchorElData: orderItemMenuAnchorElData,
		closeHandler: orderItemMenuCloseHandler,
		isMenuOpen: isorderItemMenuOpen,
		openHandler: orderItemMenuOpenHandler
	} = useMenu();

	const {
		data: getTransactionsData,
		isLoading: isGetTransactionsLoading,
		isSuccess: isGetTransactionsSuccess,
		error: getTransactionsErrorData,
		refetch: refetchTransactions
	} = useGetTransactionsQuery(
		{ page: page.toString(), statusFilter: statusFilter, sortBy, q: searchQuery },
		{
			skip: !isAuth
		}
	);
	const getUserTransactionsError: any = getTransactionsErrorData;
	const noTransactionsFound = getTransactionsData?.data?.transactions.length === 0;

	return (
		<OrdersContainer>
			<PageTitle>Orders List</PageTitle>
			<OrdersHeader container>
				<Stack
					direction="row"
					sx={{
						width: "30rem",
						"@media screen and (max-width: 800px)": {
							width: "100%"
						}
					}}
				>
					<TextInput
						label=""
						placeholder="Order number..."
						id="search-order"
						size="small"
						value={searchInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSearchInput(e.target.value);
							paginationChangeHandler(null, 1);
						}}
					/>
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
					gap={{ xs: 1, md: 2 }}
					sx={{
						"@media screen and (max-width: 800px)": {
							flexDirection: "column",
							width: "100%",
							mt: 1
						}
					}}
				>
					<SelectInput
						options={_statusFilterOptions}
						value={statusFilter}
						onChange={event => {
							setStatusFilter(event.target.value as TransactionStatus | "default");
							paginationChangeHandler(null, 1);
						}}
						size="small"
						sx={{
							"@media screen and (max-width: 800px)": {
								width: "100%"
							}
						}}
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={_sortValues}
						value={sortBy}
						onChange={event => {
							setSortBy(event.target.value as TransactionSortValues);
							paginationChangeHandler(null, 1);
						}}
						size="small"
					/>
				</Stack>
			</OrdersHeader>
			<Menu
				anchorEl={orderItemMenuAnchorEl}
				id="order-item-menu"
				isOpen={isorderItemMenuOpen}
				onClose={orderItemMenuCloseHandler}
				items={[
					{
						label: "Lihat detail",
						action: () => router.push(`/orders/${orderItemMenuAnchorElData?.id}`),
						id: "detail"
					},
					{
						label: "Edit item",
						action: () => router.push(`/orders/${orderItemMenuAnchorElData?.id}/edit`),
						id: "edit"
					}
				]}
			/>

			<OrdersList>
				<Table headData={tableHeadData}>
					{!isGetTransactionsLoading && getUserTransactionsError && (
						<TableRow>
							<TableCell colSpan={7}>
								<FallbackContainer>
									<Alert severity="error">
										{getUserTransactionsError?.data?.message ||
											"Error occured while fetching user transactions data."}
									</Alert>
									<BoxButton onClick={refetchTransactions}>Try again</BoxButton>
								</FallbackContainer>
							</TableCell>
						</TableRow>
					)}
					{isGetTransactionsLoading && (
						<TableRow>
							<TableCell colSpan={7}>
								<FallbackContainer>
									<CircularProgress />
								</FallbackContainer>
							</TableCell>
						</TableRow>
					)}
					{!isGetTransactionsLoading && isGetTransactionsSuccess && noTransactionsFound && (
						<TableRow>
							<TableCell colSpan={7}>
								<FallbackContainer>
									<Alert severity="info">No transaction found!</Alert>
								</FallbackContainer>
							</TableCell>
						</TableRow>
					)}
					{isGetTransactionsSuccess &&
						getTransactionsData &&
						getTransactionsData.data.transactions.map(data => (
							<TableRow key={data.id}>
								<TableCell>{formatDateStandard(data.created_at)}</TableCell>
								<TableCell>{data.id}</TableCell>
								<TableCell>{data.full_name}</TableCell>
								<TableCell>{data.email}</TableCell>
								<TableCell>{formatToRupiah(+data.total)}</TableCell>
								<TableCell
									align="center"
									sx={{
										"& > span": {
											width: "max-content"
										}
									}}
								>
									<StatusBadge color={getOrderStatus(data.order_status).color}>
										{getOrderStatus(data.order_status).label}
									</StatusBadge>
								</TableCell>
								<TableCell>
									<Stack direction="row" gap={1}>
										<BoxButton onClick={() => router.push(`/orders/${data.id}`)}>Detail</BoxButton>
										<BoxButton onClick={e => orderItemMenuOpenHandler(e, data)}>
											<MoreHorizIcon fontSize="small" />
										</BoxButton>
									</Stack>
								</TableCell>
							</TableRow>
						))}
				</Table>
			</OrdersList>
			{getTransactionsData?.totalPages &&
				getTransactionsData?.totalPages > 1 &&
				!noTransactionsFound && (
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
							count={+getTransactionsData?.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				)}
		</OrdersContainer>
	);
};

export default Orders;
