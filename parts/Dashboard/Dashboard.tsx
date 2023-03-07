// Dependencies
import React, { useState } from "react";
import { blue, green, orange, purple, cyan, pink } from "@mui/material/colors";

// Styles
import { ChartContainer, DashboardContainer } from "./Dashboard.styles";

// Icons
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import StarsIcon from "@mui/icons-material/Stars";
import DiscountIcon from "@mui/icons-material/Discount";

// Styles
import { InfoBox, InfoDescription, InfoIcon, InfoTitle } from "./Dashboard.styles";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Hooks
import { useGetDashboardDataQuery } from "../../api/dashboard.api";
import useSelector from "../../hooks/useSelector";
import { useRouter } from "next/router";

// Components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Alert, CircularProgress, Grid } from "@mui/material";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import AreaChart from "../../components/AreaChart/AreaChart";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";

const Dashboard = () => {
	const router = useRouter();
	const isAuth = useSelector(state => state.auth.isAuth);
	const [salesAnalyticYear, setSalesAnalyticYear] = useState(() =>
		new Date().getFullYear().toString()
	);
	const [visitorAnalyticYear, setVisitorAnalyticYear] = useState(() =>
		new Date().getFullYear().toString()
	);

	// Dashboard data
	const {
		data: getDashboardData,
		isLoading: isGetDashboardLoading,
		isSuccess: isGetDashboardSuccess,
		error: getDashboardErrorData,
		refetch: refetchDashboard
	} = useGetDashboardDataQuery(
		{ salesAnalyticYear, visitorAnalyticYear },
		{
			skip: !isAuth
		}
	);
	const getDashboardError: any = getDashboardErrorData;
	const dashboardData = getDashboardData?.data;

	return (
		<DashboardContainer>
			<PageTitle>Dashboard</PageTitle>
			{!isGetDashboardLoading && getDashboardError && (
				<FallbackContainer>
					<Alert severity="error">
						{getDashboardError?.data?.message || "Error occured while fetching dashboard data."}
					</Alert>
					<BoxButton onClick={refetchDashboard}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetDashboardLoading && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{dashboardData && isGetDashboardSuccess && (
				<Grid container spacing={{ xs: 1, md: 2, xl: 3 }} sx={{ mt: 1 }}>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/orders")}>
							<InfoIcon bgColor={blue[100]}>
								<PaidIcon color="info" />
							</InfoIcon>
							<InfoTitle>Total Penjualan</InfoTitle>
							<InfoDescription>{formatToRupiah(+dashboardData.salesTotal)}</InfoDescription>
						</InfoBox>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/orders")}>
							<InfoIcon bgColor={green[100]}>
								<LocalShippingIcon color="success" />
							</InfoIcon>
							<InfoTitle>Total Order</InfoTitle>
							<InfoDescription>{dashboardData.transactionCount}</InfoDescription>
						</InfoBox>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/products")}>
							<InfoIcon bgColor={orange[100]}>
								<InventoryIcon color="warning" />
							</InfoIcon>
							<InfoTitle>Total Produk</InfoTitle>
							<InfoDescription>{dashboardData.productCount}</InfoDescription>
						</InfoBox>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/customers")}>
							<InfoIcon bgColor={purple[100]}>
								<GroupIcon sx={{ color: purple[400] }} />
							</InfoIcon>
							<InfoTitle>Total Customers</InfoTitle>
							<InfoDescription>{dashboardData.customerCount}</InfoDescription>
						</InfoBox>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/reviews")}>
							<InfoIcon bgColor={cyan[100]}>
								<StarsIcon sx={{ color: cyan[700] }} />
							</InfoIcon>
							<InfoTitle>Ulasan Konsumen</InfoTitle>
							<InfoDescription>{dashboardData.reviewCount}</InfoDescription>
						</InfoBox>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<InfoBox onClick={() => router.push("/vouchers")}>
							<InfoIcon bgColor={pink[100]}>
								<DiscountIcon sx={{ color: pink[700] }} />
							</InfoIcon>
							<InfoTitle>Voucher Aktif</InfoTitle>
							<InfoDescription>{dashboardData.activeVoucherCount}</InfoDescription>
						</InfoBox>
					</Grid>
				</Grid>
			)}
			<Grid container spacing={3}>
				{dashboardData && isGetDashboardSuccess && (
					<>
						<Grid item xs={12} xl={6}>
							<ChartContainer>
								<AreaChart
									title="Statistik Penjualan"
									data={dashboardData.analytics.map(record => ({
										name: record.month,
										sales: record.sales_count
									}))}
									dataKey="sales"
									fillColor={green[100]}
									strokeColor={green[200]}
									yearFilter={salesAnalyticYear}
									onYearFilterChange={e => {
										setSalesAnalyticYear(e.target.value as string);
									}}
									allowDecimal={false}
								/>
							</ChartContainer>
						</Grid>
						<Grid item xs={12} xl={6}>
							<ChartContainer>
								<AreaChart
									title="Statistik Pengunjung"
									data={dashboardData.analytics.map(record => ({
										name: record.month,
										visitors: record.app_views
									}))}
									dataKey="visitors"
									fillColor={orange[100]}
									strokeColor={orange[200]}
									yearFilter={visitorAnalyticYear}
									onYearFilterChange={e => {
										setVisitorAnalyticYear(e.target.value as string);
									}}
									allowDecimal={false}
								/>
							</ChartContainer>
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<RecentOrders />
				</Grid>
			</Grid>
		</DashboardContainer>
	);
};

export default Dashboard;
