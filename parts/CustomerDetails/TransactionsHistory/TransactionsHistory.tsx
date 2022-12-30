// Dependencies
import React, { useState } from "react";

// Hooks
import { useRouter } from "next/router";
import { useGetUserTransactionsQuery } from "../../../api/transaction.api";
import usePagination from "../../../hooks/usePagination";
import useSelector from "../../../hooks/useSelector";

// Types
import { Customer, TransactionStatus } from "../../../interfaces";

// Utils
import { formatDateStandard } from "../../../utils/formatDate";
import formatToRupiah from "../../../utils/formatToRupiah";
import getOrderStatus from "../../../utils/getOrderStatus";

// Styles
import { TableCell, TableRow } from "../../../components/Table/Table.styles";
import { Section, SectionTitle } from "../CustomerDetails.styles";

// Components
import { Alert, CircularProgress, Stack } from "@mui/material";
import BoxButton from "../../../components/BoxButton/BoxButton";
import FallbackContainer from "../../../components/FallbackContainer/FallbackContainer";
import Pagination from "../../../components/Pagination/Pagination";
import SelectInput from "../../../components/SelectInput/SelectInput";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import Table from "../../../components/Table/Table";

interface TransactionsHistoryProps {
	customerData: Customer;
}

const _tableHeadData = ["Order Date", "Order Number", "Order Total", "Status", "Actions"];

const _statusFilterOptions = [
	{ label: "Semua pesanan", value: "default" },
	{ label: "Pending", value: "pending" },
	{ label: "Proses", value: "process" },
	{ label: "Dikirim", value: "sent" },
	{ label: "Selesai", value: "success" },
	{ label: "Dibatalkan", value: "cancel" }
];

const TransactionsHistory = ({ customerData }: TransactionsHistoryProps) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { customerId } = router.query;
	const [statusFilter, setStatusFilter] = useState<TransactionStatus | "default">("default");

	const { page: purchaseHistoryPage, onChange: purchaseHistoryPageChangeHandler } = usePagination();

	const {
		data: getUserTransactionsData,
		isLoading: isGetUserTransactionsLoading,
		isSuccess: isGetUserTransactionsSuccess,
		error: getUserTransactionsErrorData,
		refetch: refetchUserTransactions
	} = useGetUserTransactionsQuery(
		{ page: purchaseHistoryPage.toString(), statusFilter: statusFilter, userId: customerId },
		{
			skip: !isAuth || !customerId
		}
	);
	const getUserTransactionsError: any = getUserTransactionsErrorData;
	const noTransactionsFound = getUserTransactionsData?.data?.transactions.length === 0;

	return (
		<Section>
			<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
				<SectionTitle sx={{ mb: 0 }}>Purchase History</SectionTitle>
				<Stack direction="row" gap={2}>
					<SelectInput
						options={_statusFilterOptions}
						value={statusFilter}
						onChange={event => {
							setStatusFilter(event.target.value as TransactionStatus | "default");
						}}
						size="small"
						sx={{ width: "25rem" }}
					/>
				</Stack>
			</Stack>
			<Table headData={_tableHeadData}>
				{!isGetUserTransactionsLoading && getUserTransactionsError && (
					<TableRow>
						<TableCell colSpan={5}>
							<FallbackContainer>
								<Alert severity="error">{getUserTransactionsError.data.message}</Alert>
								<BoxButton onClick={refetchUserTransactions}>Try again</BoxButton>
							</FallbackContainer>
						</TableCell>
					</TableRow>
				)}
				{isGetUserTransactionsLoading && (
					<TableRow>
						<TableCell colSpan={5}>
							<FallbackContainer>
								<CircularProgress />
							</FallbackContainer>
						</TableCell>
					</TableRow>
				)}
				{!isGetUserTransactionsLoading && isGetUserTransactionsSuccess && noTransactionsFound && (
					<TableRow>
						<TableCell colSpan={5}>
							<FallbackContainer>
								<Alert severity="info">No transaction found!</Alert>
							</FallbackContainer>
						</TableCell>
					</TableRow>
				)}
				{isGetUserTransactionsSuccess &&
					getUserTransactionsData &&
					getUserTransactionsData.data.transactions.map(data => (
						<TableRow key={data.id}>
							<TableCell>{formatDateStandard(data.created_at)}</TableCell>
							<TableCell>{data.id}</TableCell>
							<TableCell>{formatToRupiah(+data.total)}</TableCell>
							<TableCell
								align="center"
								sx={{
									"& > p": {
										width: "max-content"
									}
								}}
							>
								<StatusBadge
									color={getOrderStatus(data.order_status).color}
									sx={{ width: "max-content" }}
								>
									{getOrderStatus(data.order_status).label}
								</StatusBadge>
							</TableCell>
							<TableCell>
								<Stack direction="row" gap={1}>
									<BoxButton onClick={() => router.push(`/orders/${data.id}`)}>Detail</BoxButton>
								</Stack>
							</TableCell>
						</TableRow>
					))}
			</Table>
			{getUserTransactionsData?.totalPages &&
				getUserTransactionsData?.totalPages > 1 &&
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
							page={purchaseHistoryPage}
							onChange={purchaseHistoryPageChangeHandler}
							count={+getUserTransactionsData?.totalPages}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				)}
		</Section>
	);
};

export default TransactionsHistory;
