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
import { useRouter } from "next/router";

// Components
import { Grid, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import BoxButton from "../../components/BoxButton/BoxButton";
import TextInput from "../../components/TextInput/TextInput";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

// Parts
import NotifMarketingsList from "./NotifMarketingsList/NotifMarketingsList";
import ScheduledNotifMarketingList from "./ScheduledNotifMarketingsList/ScheduledNotifMarketingsList";

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

const NotificationsCenter = () => {
	const router = useRouter();
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
					<Button
						startIcon={<AddIcon />}
						size="small"
						color="primary"
						onClick={() => router.push("/marketing/email/new")}
					>
						Email Marketing
					</Button>
					<Button
						startIcon={<AddIcon />}
						size="small"
						color="primary"
						onClick={() => router.push("/marketing/notification/new")}
					>
						New Notification
					</Button>
				</Stack>
			</Stack>

			<Grid container spacing={3}>
				{/* Scheduled notif marketing */}
				<ScheduledNotifMarketingList />
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
				<NotifMarketingsList />
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
