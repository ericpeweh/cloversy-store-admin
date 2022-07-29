// Dependencies
import React from "react";
import { blue, green, orange, purple, cyan, pink } from "@mui/material/colors";

// Styles
import { DashboardContainer } from "./Dashboard.styles";

// Icons
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import StarsIcon from "@mui/icons-material/Stars";
import DiscountIcon from "@mui/icons-material/Discount";

// Styles
import { InfoBox, InfoDescription, InfoIcon, InfoTitle } from "../Header/Header.styles";

// Components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid } from "@mui/material";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import AreaChart from "../../components/AreaChart/AreaChart";

const Dashboard = () => {
	return (
		<DashboardContainer>
			<PageTitle>Dashboard</PageTitle>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={blue[100]}>
							<PaidIcon color="info" />
						</InfoIcon>
						<InfoTitle>Total Penjualan</InfoTitle>
						<InfoDescription>Rp 25.439.000</InfoDescription>
					</InfoBox>
				</Grid>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={green[100]}>
							<LocalShippingIcon color="success" />
						</InfoIcon>
						<InfoTitle>Total Order</InfoTitle>
						<InfoDescription>243</InfoDescription>
					</InfoBox>
				</Grid>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={orange[100]}>
							<InventoryIcon color="warning" />
						</InfoIcon>
						<InfoTitle>Total Produk</InfoTitle>
						<InfoDescription>95</InfoDescription>
					</InfoBox>
				</Grid>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={purple[100]}>
							<GroupIcon sx={{ color: purple[400] }} />
						</InfoIcon>
						<InfoTitle>Total Customers</InfoTitle>
						<InfoDescription>3403</InfoDescription>
					</InfoBox>
				</Grid>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={cyan[100]}>
							<StarsIcon sx={{ color: cyan[700] }} />
						</InfoIcon>
						<InfoTitle>Ulasan Konsumen</InfoTitle>
						<InfoDescription>406</InfoDescription>
					</InfoBox>
				</Grid>
				<Grid item xs={4}>
					<InfoBox>
						<InfoIcon bgColor={pink[100]}>
							<DiscountIcon sx={{ color: pink[700] }} />
						</InfoIcon>
						<InfoTitle>Voucher Aktif</InfoTitle>
						<InfoDescription>16</InfoDescription>
					</InfoBox>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<AreaChart title="Statistik Penjualan" type="sales" />
				</Grid>
				<Grid item xs={6}>
					<AreaChart title="Statistik Pengunjung" type="visitors" />
				</Grid>
				<Grid item xs={12}>
					<RecentOrders />
				</Grid>
			</Grid>
		</DashboardContainer>
	);
};

export default Dashboard;