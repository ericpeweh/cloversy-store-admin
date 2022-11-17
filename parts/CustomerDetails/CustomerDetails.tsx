// Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

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
	CustomerDetailsContainer,
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
import { useGetCustomerDetailQuery } from "../../api/customer.api";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";
import useSelector from "../../hooks/useSelector";

// Utils
import { formatDateFull } from "../../utils/formatDate";

// Components
import { Grid, IconButton, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
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

const CustomerDetails = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { customerId } = router.query;
	const { page: purchaseHistoryPage, onChange: purchaseHistoryPageChangeHandler } = usePagination();

	const {
		data: getCustomerData,
		isLoading: isGetCustomerLoading,
		isSuccess: isGetCustomerSuccess,
		error: getCustomerError,
		refetch: refetchCustomer
	} = useGetCustomerDetailQuery(customerId, {
		skip: !isAuth || !customerId
	});
	const customerError: any = getCustomerError;
	const customerData = getCustomerData?.data.customer;

	const {
		isOpen: isDeleteorderModalOpen,
		openHandler: openDeleteorderModalHandler,
		closeHandler: closeDeleteorderModalHandler
	} = useModal();

	return (
		<CustomerDetailsContainer>
			{isGetCustomerSuccess && customerData && (
				<>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						alignItems={{ xs: "flex-start", sm: "center" }}
						justifyContent="space-between"
						gap={{ xs: 1, sm: 0 }}
					>
						<PageTitle sx={{ mb: 0 }}>Customer Detail</PageTitle>
						<Stack direction="row" gap={1} height="4rem" width={{ xs: "100%", sm: "auto" }}>
							<SelectInput
								options={[
									{ label: "Active", value: "active" },
									{ label: "Banned", value: "banned" }
								]}
								value={customerData.user_status}
								size="small"
								sx={{
									width: { xs: "100%", sm: "25rem" }
								}}
							/>
							<BoxButton sx={{ mr: { xs: 0, sm: 1 } }}>Save</BoxButton>
						</Stack>
					</Stack>

					<ContentContainer>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<Section>
									<DetailsContainer>
										<SectionTitle>Account Information</SectionTitle>
										<DetailItem>
											<DetailTitle>Full name</DetailTitle>
											<DetailDescription>
												<Stack direction="row" alignItems="center" gap={1}>
													<CustomerImage imageUrl={customerData.profile_image} />
													{customerData.full_name}
												</Stack>
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Email</DetailTitle>
											<Stack direction="row" alignItems="center" gap={1}>
												<DetailDescription>{customerData.email}</DetailDescription>
												<IconButton size="small">
													<ContentCopyIcon fontSize="small" />
												</IconButton>
											</Stack>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Contact</DetailTitle>
											<Stack direction="row" alignItems="center" gap={1}>
												<DetailDescription>
													{customerData.contact ? customerData.contact : "No contact provided"}
												</DetailDescription>
												{customerData.contact && (
													<IconButton size="small">
														<ContentCopyIcon fontSize="small" />
													</IconButton>
												)}
											</Stack>
										</DetailItem>
										<DetailItem>
											<DetailTitle>User status</DetailTitle>
											<DetailDescription>
												<Stack
													justifyContent="flex-start"
													direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
													gap={1}
												>
													<StatusBadge
														color={customerData.user_status === "active" ? "primary" : "error"}
													>
														{customerData.user_status}
													</StatusBadge>
													<p>
														| {customerData.user_status === "banned" ? "Banned" : "Joined"}:{" "}
														{customerData.user_status === "banned"
															? formatDateFull(customerData.banned_date)
															: formatDateFull(customerData.created_at)}
													</p>
												</Stack>
											</DetailDescription>
										</DetailItem>
										<DetailItem>
											<DetailTitle>Clover Credits</DetailTitle>
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
													Kedai Vegetarian Kan En, Jl. DR. Setia Budi No.88 (Samping Cafe Bersama),
													Kec. Pontianak Sel.,Kota Pontianak, Kalimantan Barat 78245
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
													Kedai Vegetarian Kan En, Jl. DR. Setia Budi No.88 (Samping Cafe Bersama),
													Kec. Pontianak Sel.,Kota Pontianak, Kalimantan Barat 78245
												</AddressText>
											</AddressInfo>
										</AddressContent>
									</AddressContainer>
								</Section>
							</Grid>
							<Grid item xs={12} md={6}>
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
													<Stack
														direction={{ xs: "column", sm: "row" }}
														sx={{ ml: "auto" }}
														gap={1}
													>
														<StatusBadge
															color="secondary"
															sx={{ alignSelf: "center", ml: { xs: 0, sm: 1 } }}
														>
															ACBD98DC88
														</StatusBadge>
														<BoxButton>Detail</BoxButton>
													</Stack>
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
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{ mb: 2 }}
							>
								<SectionTitle sx={{ mb: 0 }}>Purchase History</SectionTitle>
								<Stack direction="row" gap={2}>
									<SelectInput
										options={[
											{ label: "Semua pesanan", value: "default" },
											{ label: "Dikirim", value: "shipped" },
											{ label: "Pending", value: "pending" },
											{ label: "Dibatalkan", value: "cancel" },
											{ label: "Proses", value: "progress" }
										]}
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
											<StatusBadge
												color={colors[data.status.toLowerCase() as keyof colorsType]}
												sx={{ width: "max-content" }}
											>
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
									count={10}
									shape="rounded"
									color="primary"
								/>
							</Stack>
						</Section>
					</ContentContainer>
				</>
			)}
		</CustomerDetailsContainer>
	);
};

export default CustomerDetails;
