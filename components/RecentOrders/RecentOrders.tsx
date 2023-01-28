// Dependencies
import React from "react";

// Styles
import { RecentOrdersContainer, TableContainer } from "./RecentOrders.styles";
import { TableCell, TableRow } from "../Table/Table.styles";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Utils
import { formatDateStandard } from "../../utils/formatDate";
import formatToRupiah from "../../utils/formatToRupiah";
import getOrderStatus from "../../utils/getOrderStatus";

// Hooks
import useMenu from "../../hooks/useMenu";
import { useRouter } from "next/router";
import { useGetTransactionsQuery } from "../../api/transaction.api";
import useSelector from "../../hooks/useSelector";

// Components
import Table from "../Table/Table";
import { Alert, CircularProgress, Stack } from "@mui/material";
import StatusBadge from "../StatusBadge/StatusBadge";
import BoxButton from "../BoxButton/BoxButton";
import Menu from "../Menu/Menu";
import SectionTitle from "../SectionTitle/SectionTitle";
import FallbackContainer from "../FallbackContainer/FallbackContainer";

const tableHeadData = [
	"Tanggal Order",
	"No Pesanan",
	"Nama",
	"Email",
	"Total Pesanan",
	"Status",
	"Tindakan"
];

const RecentOrders = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);
	const {
		anchorEl: orderItemMenuAnchorEl,
		anchorElData: orderItemMenuAnchorElData,
		closeHandler: orderItemMenuCloseHandler,
		isMenuOpen: isorderItemMenuOpen,
		openHandler: orderItemMenuOpenHandler
	} = useMenu();

	// Recent transaction data
	const {
		data: getTransactionsData,
		isLoading: isGetTransactionsLoading,
		isSuccess: isGetTransactionsSuccess,
		error: getTransactionsErrorData,
		refetch: refetchTransactions
	} = useGetTransactionsQuery(
		{ page: "1", statusFilter: "default", sortBy: "default", q: "" },
		{
			skip: !isAuth
		}
	);
	const getUserTransactionsError: any = getTransactionsErrorData;
	const noTransactionsFound = getTransactionsData?.data?.transactions.length === 0;

	return (
		<RecentOrdersContainer>
			<SectionTitle>Orderan Terkini</SectionTitle>
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
			<TableContainer>
				<Table headData={tableHeadData}>
					{!isGetTransactionsLoading && getUserTransactionsError && (
						<TableRow>
							<TableCell colSpan={7}>
								<FallbackContainer>
									<Alert severity="error">{getUserTransactionsError.data.message}</Alert>
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
			</TableContainer>
		</RecentOrdersContainer>
	);
};

export default RecentOrders;
