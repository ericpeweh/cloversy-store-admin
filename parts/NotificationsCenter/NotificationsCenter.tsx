// Dependencies
import React from "react";

// Styles
import {
	ListContainer,
	ListItem,
	ListItemText,
	ListItemTitle,
	NotificationsCenterContainer,
	Section
} from "./NotificationsCenter.styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

// Hooks
import usePagination from "../../hooks/usePagination";
import useMenu from "../../hooks/useMenu";

// Components
import { Grid, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const NotificationsHeadData = [
	"Tanggal Dikirim",
	"Judul Notifikasi",
	"Tipe / Platform",
	"Target",
	"Tindakan"
];

const NotificationsData = [
	{
		date: "28/07/2022 11:45 WIB",
		title: "Promosi Akhir Bulan",
		type: "Web",
		target: "All Customers"
	},
	{
		date: "28/07/2022 11:45 WIB",
		title: "Bulan Lebaran Free Ongkir",
		type: "Web",
		target: "250 Customers"
	},
	{
		date: "25/07/2022 11:45 WIB",
		title: "Belanja Diskon Gebyar",
		type: "Push",
		target: "All Customers"
	},
	{
		date: "17/08/2022 10:00 WIB",
		title: "Diskon 17 Agustus",
		type: "Web",
		target: "100 Customers"
	},
	{
		date: "15/08/2022 11:45 WIB",
		title: "Bersatu Dalam Indonesia | 17 Agustus Sale",
		type: "Push",
		target: "All Customers"
	}
];

const EmailsHeadData = ["Tanggal Dikirim", "Subject Email", "Target", "Tindakan"];

const EmailsData = [
	{
		date: "28/07/2022 11:45 WIB",
		title: "Promosi Akhir Bulan",
		target: "All Customers"
	},
	{
		date: "28/07/2022 11:45 WIB",
		title: "Bulan Lebaran Free Ongkir",
		target: "250 Customers"
	},
	{
		date: "25/07/2022 11:45 WIB",
		title: "Belanja Diskon Gebyar",
		target: "All Customers"
	},
	{
		date: "17/08/2022 10:00 WIB",
		title: "Diskon 17 Agustus",
		target: "100 Customers"
	},
	{
		date: "15/08/2022 11:45 WIB",
		title: "Bersatu Dalam Indonesia | 17 Agustus Sale",
		target: "All Customers"
	}
];

interface colorsType {
	web: string;
	push: string;
}

const colors: colorsType = {
	web: "primary",
	push: "secondary"
};

const NotificationsCenter = () => {
	const { page: notificationsPage, onChange: notificationsPageChangeHandler } = usePagination();
	const { page: emailsPage, onChange: emailsPageChangeHandler } = usePagination();

	const {
		anchorEl: itemMenuAnchorEl,
		closeHandler: itemMenuCloseHandler,
		isMenuOpen: isItemMenuOpen,
		openHandler: itemMenuOpenHandler
	} = useMenu();

	return (
		<NotificationsCenterContainer>
			<Menu
				anchorEl={itemMenuAnchorEl}
				id="order-item-menu"
				isOpen={isItemMenuOpen}
				onClose={itemMenuCloseHandler}
				items={[
					{ label: "Lihat detail", action: () => {}, id: "detail" },
					{ label: "Edit item", action: () => {}, id: "edit" },
					{ label: "Batalkan", action: () => {}, id: "hapus" }
				]}
			/>

			<Stack
				direction={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "flex-start", sm: "center" }}
				justifyContent="space-between"
				sx={{ mb: 2 }}
			>
				<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Notifications Center</PageTitle>
				<Stack direction={"row"} gap={2}>
					<Button startIcon={<AddIcon />} size="small" color="primary">
						Email Marketing
					</Button>
					<Button startIcon={<AddIcon />} size="small" color="primary" onClick={() => {}}>
						New Notification
					</Button>
				</Stack>
			</Stack>

			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Section>
						<SectionTitle>Scheduled Notifications</SectionTitle>
						<ListContainer>
							<ListItem>
								<Stack>
									<ListItemTitle>Promosi Lebaran 2022</ListItemTitle>
									<ListItemText>
										<StatusBadge color="primary">WEB</StatusBadge> | Targets: 250 Customers
									</ListItemText>
									<ListItemText>
										<TimerOutlinedIcon />
										Senin, 8 Agustus 2022 15:35 WIB
									</ListItemText>
								</Stack>
								<BoxButton onClick={itemMenuOpenHandler}>
									<MoreHorizIcon />
								</BoxButton>
							</ListItem>
							<ListItem>
								<Stack>
									<ListItemTitle>Shopping Special Sale</ListItemTitle>
									<ListItemText>
										<StatusBadge color="secondary">PUSH</StatusBadge> | Targets: All Customers
									</ListItemText>
									<ListItemText>
										<TimerOutlinedIcon />
										Senin, 8 Agustus 2022 15:35 WIB
									</ListItemText>
								</Stack>
								<BoxButton onClick={itemMenuOpenHandler}>
									<MoreHorizIcon />
								</BoxButton>
							</ListItem>
						</ListContainer>
					</Section>
				</Grid>
				<Grid item xs={12} md={6}>
					<Section>
						<SectionTitle>Scheduled Email</SectionTitle>
						<ListContainer>
							<ListItem>
								<Stack>
									<ListItemTitle>Birthday Sale | Free Voucher</ListItemTitle>
									<ListItemText>Targets: 5 Customers</ListItemText>
									<ListItemText>
										<TimerOutlinedIcon />
										Jum`at, 12 Agustus 2022 15:35 WIB
									</ListItemText>
								</Stack>
								<BoxButton onClick={itemMenuOpenHandler}>
									<MoreHorizIcon />
								</BoxButton>
							</ListItem>
						</ListContainer>
					</Section>
				</Grid>
				<Grid item xs={12}>
					<Section>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							justifyContent="space-between"
							alignItems={{ xs: "flex-start", sm: "center" }}
							sx={{ mb: 2 }}
							gap={{ xs: 1, sm: 0 }}
						>
							<SectionTitle>Notifications History</SectionTitle>
							<Stack direction="row" gap={2} sx={{ width: { xs: "100%", sm: "30rem" } }}>
								<TextInput
									label=""
									placeholder="Search notification..."
									id="search-notification"
									size="small"
								/>
							</Stack>
						</Stack>
						<Table headData={NotificationsHeadData}>
							{NotificationsData.map(data => (
								<TableRow key={Math.random()}>
									<TableCell>{data.date}</TableCell>
									<TableCell>{data.title}</TableCell>
									<TableCell
										align="center"
										sx={{
											"& > p": {
												width: "max-content"
											}
										}}
									>
										<StatusBadge
											color={colors[data.type.toLowerCase() as keyof colorsType]}
											sx={{ width: "max-content" }}
										>
											{data.type}
										</StatusBadge>
									</TableCell>
									<TableCell>{data.target}</TableCell>
									<TableCell>
										<Stack direction="row" gap={1}>
											<BoxButton>Detail</BoxButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</Table>
						<Stack
							justifyContent="flex-end"
							direction="row"
							mt={{ xs: 3, md: 4 }}
							sx={{
								"@media screen and (max-width: 800px)": {
									justifyContent: "center"
								}
							}}
						>
							<Pagination
								page={notificationsPage}
								onChange={notificationsPageChangeHandler}
								count={10}
								shape="rounded"
								color="primary"
							/>
						</Stack>
					</Section>
				</Grid>
				<Grid item xs={12}>
					<Section>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							justifyContent="space-between"
							alignItems={{ xs: "flex-start", sm: "center" }}
							sx={{ mb: 2 }}
							gap={{ xs: 1, sm: 0 }}
						>
							<SectionTitle>Email Marketing History</SectionTitle>
							<Stack direction="row" gap={2} sx={{ width: { xs: "100%", sm: "30rem" } }}>
								<TextInput label="" placeholder="Search email..." id="search-email" size="small" />
							</Stack>
						</Stack>
						<Table headData={EmailsHeadData}>
							{EmailsData.map(data => (
								<TableRow key={Math.random()}>
									<TableCell>{data.date}</TableCell>
									<TableCell>{data.title}</TableCell>
									<TableCell>{data.target}</TableCell>
									<TableCell>
										<Stack direction="row" gap={1}>
											<BoxButton>Detail</BoxButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</Table>
						<Stack
							justifyContent="flex-end"
							direction="row"
							mt={{ xs: 3, md: 4 }}
							sx={{
								"@media screen and (max-width: 800px)": {
									justifyContent: "center"
								}
							}}
						>
							<Pagination
								page={emailsPage}
								onChange={emailsPageChangeHandler}
								count={10}
								shape="rounded"
								color="primary"
							/>
						</Stack>
					</Section>
				</Grid>
			</Grid>
		</NotificationsCenterContainer>
	);
};

export default NotificationsCenter;
