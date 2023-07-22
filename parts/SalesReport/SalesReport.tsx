// Dependencies
import React, { useMemo, useState } from "react";
import { DateTime } from "luxon";

// Hooks
import { useGetSalesReportQuery } from "../../api/report.api";
import useSelector from "../../hooks/useSelector";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";
import { formatDateStandard } from "../../utils/formatDate";

// Components
import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import PageTitle from "../../components/PageTitle/PageTitle";
import DatePicker from "../../components/DatePicker/DatePicker";

// Types
import { SalesReportItemData } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";
import useDebounce from "../../hooks/useDebounce";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";

const _dataGridColumns: GridColDef[] = [
	{
		field: "id",
		headerName: "No.",
		width: 70,
		align: "center",
		headerAlign: "center",
		colSpan: ({ row }) => (row.id === 999999 ? 9 : undefined),
		valueGetter: ({ value, row }) => (row.id === 999999 ? row.product_title : value)
	},
	{
		field: "created_at",
		headerName: "Tanggal",
		width: 130,
		valueGetter: (params: GridValueGetterParams) => formatDateStandard(params.row.created_at)
	},
	{
		field: "transaction_id",
		headerName: "No Transaksi",
		width: 130
	},
	{
		field: "product_title",
		headerName: "Nama Produk",
		width: 350
	},
	{
		field: "quantity",
		headerName: "Quantity",
		width: 90,
		align: "center"
	},
	{
		field: "product_size",
		headerName: "Ukuran",
		width: 100,
		valueGetter: (params: GridValueGetterParams) => `EU ${params.row.product_size}`
	},
	{
		field: "subtotal",
		headerName: "Subtotal",
		width: 150,
		valueGetter: (params: GridValueGetterParams) => formatToRupiah(params.row.subtotal)
	},
	{
		field: "discount_total",
		headerName: "Diskon",
		width: 130,
		valueGetter: (params: GridValueGetterParams) => formatToRupiah(params.row.discount_total)
	},
	{
		field: "voucher_code",
		headerName: "Kode Voucher",
		width: 130,
		valueGetter: (params: GridValueGetterParams) => params.row.voucher_code || "-"
	},
	{
		field: "total",
		headerName: "Total Penjualan",
		width: 130,
		valueGetter: (params: GridValueGetterParams) => {
			return formatToRupiah(params.row.total);
		}
	}
];

const SalesReport = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const [startDate, setStartDate] = useState(DateTime.now().startOf("month")); // start of current month
	const [endDate, setEndDate] = useState(DateTime.now()); // today's date

	// Debounce filter data
	const debouncedStartDate = useDebounce(startDate, 1500);
	const debouncedEndDate = useDebounce(endDate, 1500);

	// Sales report data API
	const {
		data: getSalesReportData,
		isLoading: isGetSalesReportLoading,
		isSuccess: isGetSalesReportSuccess,
		error: getSalesReportErrorData,
		refetch: refetchSalesReport
	} = useGetSalesReportQuery(
		{ startDate: debouncedStartDate.toISODate(), endDate: debouncedEndDate.toISODate() },
		{
			skip: !isAuth
		}
	);
	const getSalesReportError: any = getSalesReportErrorData;

	const _dataGridRows: SalesReportItemData[] = useMemo(() => {
		if (!Boolean(getSalesReportData?.data?.reports)) return [];

		const data =
			getSalesReportData?.data.reports.map((item: SalesReportItemData, index: number) => ({
				...item,
				id: index + 1
			})) || [];

		// Add additional total row at the end of list
		if (data.length > 0) {
			const salesTotal = data.reduce((acc, curr) => (acc += +curr.total), 0);

			data.push({ id: 999999, product_title: "Total", total: salesTotal } as any);
		}

		return data;
	}, [getSalesReportData]);

	const noDataFound = !_dataGridRows || _dataGridRows.length === 0;

	return (
		<Box>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
				<PageTitle>Sales Report</PageTitle>
				<Stack direction="row" spacing={2} alignItems="center">
					<DatePicker
						label="Start Date"
						value={startDate}
						onChange={(value: DateTimeType) => setStartDate(value)}
					/>
					<DatePicker
						label="End Date"
						value={endDate}
						onChange={(value: DateTimeType) => setEndDate(value)}
						minDate={startDate}
					/>
				</Stack>
			</Stack>
			<Box bgcolor="#fff">
				{isGetSalesReportLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetSalesReportLoading && isGetSalesReportSuccess && noDataFound && (
					<FallbackContainer>
						<Alert severity="info">No sales data found!</Alert>
					</FallbackContainer>
				)}
				{!isGetSalesReportLoading && getSalesReportError && (
					<FallbackContainer>
						<Alert severity="error">
							{getSalesReportError?.data?.message ||
								"Error occured while fetching sales report data."}
						</Alert>
						<BoxButton onClick={refetchSalesReport}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{!getSalesReportError && isGetSalesReportSuccess && !noDataFound && (
					<DataGrid
						rows={_dataGridRows || []}
						columns={_dataGridColumns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 20 }
							}
						}}
						pageSizeOptions={[10, 20, 50, 100]}
						rowSelection={false}
					/>
				)}
			</Box>
		</Box>
	);
};

export default SalesReport;
