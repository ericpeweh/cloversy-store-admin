// Dependencies
import React from "react";
import { useRouter } from "next/router";

// Styles
import {
	AddressContainer,
	AddressContent,
	AddressInfo,
	AddressLabel,
	AddressText,
	ContentContainer,
	CustomerImage,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	CardItemImage,
	CardTitle,
	OrderDetailsContainer,
	RecipientName,
	Section,
	SectionTitle,
	CardSubtitle,
	CardItemContainer
} from "./CustomerDetails.styles";

// Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DiscountIcon from "@mui/icons-material/Discount";

// Hooks
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

// Components
import { Grid, IconButton, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import BoxButton from "../../components/BoxButton/BoxButton";
import SelectInput from "../../components/SelectInput/SelectInput";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import Pagination from "../../components/Pagination/Pagination";

const tableHeadData = ["Tanggal Order", "No Pesanan", "Total Pesanan", "Status", "Tindakan"];

const ordersData = [
	{
		date: "28/07/2022",
		noInvoice: "00304",
		totalPesanan: "Rp 6.499.000",
		status: "Dikirim"
	},
	{
		date: "28/07/2022",
		noInvoice: "04474",
		totalPesanan: "Rp 2.499.000",
		status: "Pending"
	},
	{
		date: "25/07/2022",
		noInvoice: "00704",
		totalPesanan: "Rp 899.000",
		status: "Proses"
	},
	{
		date: "25/07/2022",
		noInvoice: "01234",
		totalPesanan: "Rp 5.999.000",
		status: "Dibatalkan"
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

const OrderDetails = () => {
	const router = useRouter();
	const { page: purchaseHistoryPage, onChange: purchaseHistoryPageChangeHandler } = usePagination();

	const {
		isOpen: isDeleteorderModalOpen,
		openHandler: openDeleteorderModalHandler,
		closeHandler: closeDeleteorderModalHandler
	} = useModal();

	return (
		<OrderDetailsContainer>
			<ConfirmationModal
				modalTitle="Delete order"
				modalDescription="Are you sure you want to delete <order name>, this action can't be undone."
				onClose={closeDeleteorderModalHandler}
				open={isDeleteorderModalOpen}
				confirmText="Delete"
				confirmColor="error"
				cancelText="Cancel"
				cancelColor="secondary"
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle>Customer Detail</PageTitle>
				<Stack direction="row" gap={1} height="4rem">
					<SelectInput
						options={["Change user status", "Active", "Banned"]}
						value={"Change user status"}
						size="small"
						sx={{ width: "25rem" }}
					/>
					<BoxButton sx={{ mr: 1 }}>Save</BoxButton>
				</Stack>
			</Stack>

			<ContentContainer>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Section>
							<DetailsContainer>
								<SectionTitle>Account Information</SectionTitle>
								<DetailItem>
									<DetailTitle>Full name</DetailTitle>
									<DetailDescription>
										<Stack direction="row" alignItems="center" gap={1}>
											<CustomerImage imageUrl="/images/1.jpg" />
											Mikici Cimol
										</Stack>
									</DetailDescription>
								</DetailItem>
								<DetailItem>
									<DetailTitle>Email</DetailTitle>
									<Stack direction="row" alignItems="center" gap={1}>
										<DetailDescription>mikicicimol@gmail.com</DetailDescription>
										<IconButton size="small">
											<ContentCopyIcon fontSize="small" />
										</IconButton>
									</Stack>
								</DetailItem>
								<DetailItem>
									<DetailTitle>Contact</DetailTitle>
									<Stack direction="row" alignItems="center" gap={1}>
										<DetailDescription>+62 853 1234 2134</DetailDescription>
										<IconButton size="small">
											<ContentCopyIcon fontSize="small" />
										</IconButton>
									</Stack>
								</DetailItem>
								<DetailItem>
									<DetailTitle>Order status</DetailTitle>
									<DetailDescription>
										<Stack justifyContent="flex-start" direction="row" gap={1}>
											<StatusBadge color="error">Banned</StatusBadge> | Banned: 21 Juli 2022, 14:40
											WIB
										</Stack>
									</DetailDescription>
								</DetailItem>
								<DetailItem>
									<DetailTitle>Cloversy Credits</DetailTitle>
									<Stack direction="row" alignItems="center" gap={1}>
										<DetailDescription>0</DetailDescription>
									</Stack>
								</DetailItem>
							</DetailsContainer>
						</Section>
						<Section>
							<SectionTitle>Saved Addresses</SectionTitle>
							<AddressContainer>
								<AddressContent>
									<AddressInfo>
										<AddressLabel>
											<StatusBadge color="primary">Utama</StatusBadge>Address 1
										</AddressLabel>
										<RecipientName>Eric Prima Wijaya</RecipientName>
										<AddressText>+62 878 1234 5678</AddressText>
										<AddressText>
											Kedai Vegetarian Kan En, Jl. DR. Setia Budi No.88 (Samping Cafe Bersama), Kec.
											Pontianak Sel.,Kota Pontianak, Kalimantan Barat 78245
										</AddressText>
									</AddressInfo>
								</AddressContent>
							</AddressContainer>
							<AddressContainer>
								<AddressContent>
									<AddressInfo>
										<AddressLabel>Address 2</AddressLabel>
										<RecipientName>Mikici Cimol</RecipientName>
										<AddressText>+62 878 1234 5678</AddressText>
										<AddressText>
											Kedai Vegetarian Kan En, Jl. DR. Setia Budi No.88 (Samping Cafe Bersama), Kec.
											Pontianak Sel.,Kota Pontianak, Kalimantan Barat 78245
										</AddressText>
									</AddressInfo>
								</AddressContent>
							</AddressContainer>
						</Section>
					</Grid>
					<Grid item xs={6}>
						<Section>
							<SectionTitle>Last Seen Product</SectionTitle>
							<Grid container spacing={1}>
								{[1, 2, 3].map(item => (
									<Grid item xs={12} key={item}>
										<CardItemContainer>
											<CardItemImage imageUrl="/images/product.jpg" />
											<CardTitle>Nike AF1 Homesick - Special Edition</CardTitle>
											<BoxButton>Detail</BoxButton>
										</CardItemContainer>
									</Grid>
								))}
							</Grid>
						</Section>
						<Section>
							<SectionTitle>Wishlist</SectionTitle>
							<Grid container spacing={1}>
								{[1, 2].map(item => (
									<Grid item xs={12} key={item}>
										<CardItemContainer>
											<CardItemImage imageUrl="/images/product.jpg" />
											<Stack justifyContent="center">
												<CardTitle>Nike AF1 Creation of Adam</CardTitle>
												<CardSubtitle>Size: EU 40</CardSubtitle>
											</Stack>
											<BoxButton>Detail</BoxButton>
										</CardItemContainer>
									</Grid>
								))}
							</Grid>
						</Section>
						<Section>
							<SectionTitle>Owned Vouchers</SectionTitle>
							<Grid container spacing={1}>
								{[1, 2].map(item => (
									<Grid item xs={12} key={item}>
										<CardItemContainer>
											<CardItemImage>
												<DiscountIcon />
											</CardItemImage>
											<Stack justifyContent="center">
												<CardTitle>Diskon Spesial Natal 25K</CardTitle>
												<CardSubtitle>Berlaku hingga 23 Jul 2022</CardSubtitle>
											</Stack>
											<StatusBadge color="secondary" sx={{ alignSelf: "center", ml: 1 }}>
												ACBD98DC88
											</StatusBadge>
											<BoxButton>Detail</BoxButton>
										</CardItemContainer>
									</Grid>
								))}
							</Grid>
						</Section>
					</Grid>
				</Grid>
			</ContentContainer>
			<ContentContainer>
				<Section>
					<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
						<SectionTitle>Purchase History</SectionTitle>
						<Stack direction="row" gap={2}>
							<SelectInput
								options={["Status pesanan", "Dikirim", "Pending", "Dibatalkan", "Proses"]}
								value={"Status pesanan"}
								size="small"
								sx={{ width: "25rem" }}
							/>
						</Stack>
					</Stack>
					<Table headData={tableHeadData}>
						{[...ordersData, ...ordersData].map(data => (
							<TableRow key={data.noInvoice}>
								<TableCell>{data.date}</TableCell>
								<TableCell>{data.noInvoice}</TableCell>
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
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</Table>
					<Stack justifyContent="flex-end" direction="row" mt={4}>
						<Pagination
							page={purchaseHistoryPage}
							onChange={purchaseHistoryPageChangeHandler}
							count={10}
							shape="rounded"
							color="primary"
						/>
					</Stack>
				</Section>
			</ContentContainer>
		</OrderDetailsContainer>
	);
};

export default OrderDetails;
