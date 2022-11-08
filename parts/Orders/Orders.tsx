// Dependencies
import React from "react";

// Styles
import { OrdersContainer, OrdersHeader, OrdersList } from "./Orders.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Hooks
import usePagination from "../../hooks/usePagination";
import useMenu from "../../hooks/useMenu";

// Components
import { Stack, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import SelectInput from "../../components/SelectInput/SelectInput";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";

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

const Orders = () => {
	const { page, onChange: paginationChangeHandler } = usePagination();
	const {
		anchorEl: orderItemMenuAnchorEl,
		closeHandler: orderItemMenuCloseHandler,
		isMenuOpen: isorderItemMenuOpen,
		openHandler: orderItemMenuOpenHandler
	} = useMenu();

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
					<TextInput label="" placeholder="Search order..." id="search-order" size="small" />
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
						options={["Status", "Active", "Disabled", "Show all"]}
						value={"Status"}
						size="small"
						sx={{
							width: "20rem",
							"@media screen and (max-width: 800px)": {
								width: "100%"
							}
						}}
					/>
					<SelectInput
						startAdornment={<SortIcon sx={{ mr: 1 }} />}
						options={[
							"Default sorting",
							"Sort by date of purchase",
							"Sort by order number",
							"Sort by status",
							"Sort by total: low to high",
							"Sort by total: high to low"
						]}
						value="Default sorting"
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
					{ label: "Lihat detail", action: () => {}, id: "detail" },
					{ label: "Edit item", action: () => {}, id: "edit" },
					{ label: "Hapus", action: () => {}, id: "hapus" }
				]}
			/>

			<OrdersList>
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
									"& > span": {
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
									<BoxButton onClick={orderItemMenuOpenHandler}>
										<MoreHorizIcon fontSize="small" />
									</BoxButton>
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</Table>
			</OrdersList>
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
					count={10}
					shape="rounded"
					color="primary"
				/>
			</Stack>
		</OrdersContainer>
	);
};

export default Orders;
