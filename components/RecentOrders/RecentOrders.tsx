// Dependencies
import React from "react";

// Styles
import { RecentOrdersContainer, TableContainer } from "./RecentOrders.styles";

// Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Hooks
import useMenu from "../../hooks/useMenu";

// Components
import Table from "../Table/Table";
import { TableCell, TableRow } from "../Table/Table.styles";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Stack, Typography } from "@mui/material";
import BoxButton from "../BoxButton/BoxButton";
import Menu from "../Menu/Menu";
import SectionTitle from "../SectionTitle/SectionTitle";

const tableHeadData = [
	"Tanggal Order",
	"No Pesanan",
	"Nama",
	"Email",
	"Total Pesanan",
	"Status",
	"Tindakan"
];

const ordersData = [
	{
		date: "28/07/2022",
		noOrder: "00304",
		nama: "Eric Prima",
		email: "ericpeweh@gmail.com",
		totalPesanan: "Rp 6.499.000",
		status: "Dikirim"
	},
	{
		date: "28/07/2022",
		noOrder: "04474",
		nama: "Prima Wijaya",
		email: "ericpeweh1234@gmail.com",
		totalPesanan: "Rp 2.499.000",
		status: "Pending"
	},
	{
		date: "25/07/2022",
		noOrder: "00704",
		nama: "Mikici Lemao",
		email: "mikicilemao@gmail.com",
		totalPesanan: "Rp 899.000",
		status: "Proses"
	},
	{
		date: "25/07/2022",
		noOrder: "01234",
		nama: "Mikicis",
		email: "mikicishmmm@gmail.com",
		totalPesanan: "Rp 5.999.000",
		status: "Dibatalkan"
	},
	{
		date: "25/07/2022",
		noOrder: "00704",
		nama: "Mikici Lemao",
		email: "mikicilemao@gmail.com",
		totalPesanan: "Rp 899.000",
		status: "Dikirim"
	},
	{
		date: "25/07/2022",
		noOrder: "01234",
		nama: "Mikicis",
		email: "mikicishmmm@gmail.com",
		totalPesanan: "Rp 5.999.000",
		status: "Dikirim"
	}
];

interface colorsType {
	dikirim: string;
	pending: string;
	dibatalkan: string;
	proses: string;
}

const colors: colorsType = {
	dikirim: "primary",
	pending: "warning",
	dibatalkan: "error",
	proses: "info"
};

const RecentOrders = () => {
	const {
		isMenuOpen: isOrderMenuOpen,
		openHandler: openOrderMenuHandler,
		closeHandler: closeOrderMenuHandler,
		anchorEl: orderMenuAnchorEl
	} = useMenu();

	return (
		<RecentOrdersContainer>
			<SectionTitle>Orderan Terkini</SectionTitle>
			<Menu
				id="recents-order-menu"
				isOpen={isOrderMenuOpen}
				items={[
					{ label: "Lihat detail", action: () => {}, id: "detail" },
					{ label: "Edit item", action: () => {}, id: "edit" },
					{ label: <Typography color="error">Hapus</Typography>, action: () => {}, id: "hapus" }
				]}
				anchorEl={orderMenuAnchorEl}
				onClose={closeOrderMenuHandler}
			/>
			<TableContainer>
				<Table headData={tableHeadData}>
					{ordersData.map(data => (
						<TableRow key={data.noOrder}>
							<TableCell>{data.date}</TableCell>
							<TableCell>{data.noOrder}</TableCell>
							<TableCell>{data.nama}</TableCell>
							<TableCell>{data.email}</TableCell>
							<TableCell>{data.totalPesanan}</TableCell>
							<TableCell
								align="center"
								sx={{
									"& > p": {
										width: "max-content"
									}
								}}
							>
								<StatusBadge color={colors[data.status.toLowerCase() as keyof colorsType]}>
									{data.status}
								</StatusBadge>
							</TableCell>
							<TableCell>
								<Stack direction="row" gap={1}>
									<BoxButton>Detail</BoxButton>
									<BoxButton onClick={openOrderMenuHandler}>
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
