// Dependencies
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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

// Types
import { CustomerStatus } from "../../interfaces";

// Hooks
import { useGetCustomerDetailQuery, useUpdateCustomerMutation } from "../../api/customer.api";
import usePagination from "../../hooks/usePagination";
import useSelector from "../../hooks/useSelector";

// Utils
import { formatDateFull, formatDateFullMonth } from "../../utils/formatDate";

// Components
import {
	Grid,
	IconButton,
	SelectChangeEvent,
	Stack,
	Typography,
	CircularProgress,
	Snackbar,
	Alert
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import BoxButton from "../../components/BoxButton/BoxButton";
import SelectInput from "../../components/SelectInput/SelectInput";
import Table from "../../components/Table/Table";
import { TableCell, TableRow } from "../../components/Table/Table.styles";
import Pagination from "../../components/Pagination/Pagination";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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
	const [successCopy, setSuccessCopy] = useState(false);
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
	const userStatus = customerData?.user_status;
	const [userStatusInput, setUserStatusInput] = useState(userStatus);

	const [
		updateUserStatus,
		{
			isLoading: isUpdateUserStatusLoading,
			error: updateUserStatusError,
			isSuccess: isUpdateUserStatusSuccess,
			reset: resetUpdateStatus
		}
	] = useUpdateCustomerMutation();
	const userStatusError: any = updateUserStatusError;

	const userStatusInputChangeHandler = (e: SelectChangeEvent<unknown>) => {
		setUserStatusInput(e.target.value as CustomerStatus);
	};

	const updateUserStatusHandler = () => {
		if (userStatusInput !== customerData?.user_status && customerData?.id) {
			updateUserStatus({
				prev_status: userStatus,
				user_status: userStatusInput,
				id: customerData?.id
			});
		}
	};

	useEffect(() => {
		if (userStatus) {
			setUserStatusInput(userStatus);
		}
	}, [userStatus]);

	useEffect(() => {
		if (isUpdateUserStatusSuccess) {
			resetUpdateStatus();
		}
	}, [isUpdateUserStatusSuccess, resetUpdateStatus]);

	const copyCustomerEmailHandler = async () => {
		if (customerData?.email) {
			await navigator.clipboard.writeText(customerData?.email);
			setSuccessCopy(true);
		}
	};

	return (
		<>
			<Head>
				<title>Customer Details | {customerData?.full_name || "Loading..."}</title>
			</Head>
			<CustomerDetailsContainer>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={successCopy}
					onClose={() => setSuccessCopy(false)}
					message="Customer email copied!"
					key={"customer_code_copy"}
					autoHideDuration={1500}
				/>
				{!isGetCustomerLoading && getCustomerError && (
					<FallbackContainer>
						<ErrorMessage>{customerError.data.message}</ErrorMessage>
						<BoxButton onClick={refetchCustomer}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetCustomerLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{isGetCustomerSuccess && customerData && (
					<>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "flex-start", sm: "center" }}
							justifyContent="space-between"
							gap={{ xs: 1, sm: 0 }}
						>
							<PageTitle sx={{ mb: 0 }}>Customer Detail</PageTitle>
							<Stack direction="column">
								<Stack direction="row" gap={1} height="4rem" width={{ xs: "100%", sm: "auto" }}>
									{userStatusInput && (
										<>
											<SelectInput
												options={[
													{ label: "Active", value: "active" },
													{ label: "Banned", value: "banned" }
												]}
												value={userStatusInput}
												onChange={userStatusInputChangeHandler}
												size="small"
												sx={{
													width: { xs: "100%", sm: "25rem" }
												}}
											/>
											<BoxButton
												loading={isUpdateUserStatusLoading}
												sx={{ mr: { xs: 0, sm: 1 } }}
												onClick={updateUserStatusHandler}
											>
												Save
											</BoxButton>
										</>
									)}
								</Stack>
								{updateUserStatusError && (
									<ErrorMessage sx={{ alignSelf: "flex-end" }}>
										{userStatusError?.data.message}
									</ErrorMessage>
								)}
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
														<CustomerImage imageUrl={customerData.profile_picture} />
														{customerData.full_name}
													</Stack>
												</DetailDescription>
											</DetailItem>
											<DetailItem>
												<DetailTitle>Email</DetailTitle>
												<Stack direction="row" alignItems="center" gap={1}>
													<DetailDescription>{customerData.email}</DetailDescription>
													<IconButton size="small" onClick={copyCustomerEmailHandler}>
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
													<DetailDescription>{customerData.credits}</DetailDescription>
												</Stack>
											</DetailItem>
										</DetailsContainer>
									</Section>
									<Section>
										<SectionTitle>Saved Addresses</SectionTitle>
										{customerData.address.length === 0 && (
											<Alert severity="info" sx={{ width: "100%", mt: 2 }}>
												No saved address.
											</Alert>
										)}
										{customerData.address.map((data, i) => (
											<AddressContainer key={data.id}>
												<AddressContent>
													<AddressInfo>
														<AddressLabel>
															{data.is_default && <StatusBadge color="primary">Utama</StatusBadge>}
															{data.label}
														</AddressLabel>
														<RecipientName>{data.recipient_name}</RecipientName>
														<AddressText>{data.contact}</AddressText>
														<AddressText>
															{data.province}, {data.city}, {data.subdistrict}
														</AddressText>
														<AddressText>
															{data.address} {data.postal_code}
														</AddressText>
													</AddressInfo>
												</AddressContent>
											</AddressContainer>
										))}
									</Section>
								</Grid>
								<Grid item xs={12} md={6}>
									<Section>
										<SectionTitle>Last Seen Product</SectionTitle>
										<Grid container spacing={1}>
											{customerData.lastSeen.length === 0 && (
												<Grid item xs={12}>
													<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
														User hasn&apos;t seen any products yet
													</Alert>
												</Grid>
											)}
											{customerData.lastSeen.map(product => (
												<Grid item xs={12} key={product.id}>
													<CardItemContainer>
														<CardItemImage
															imageUrl={(product?.images || [])[0] || "/images/no-image.png"}
														/>
														<Stack justifyContent="center">
															<CardTitle>{product.title}</CardTitle>
															<CardSubtitle>{formatDateFull(product.seen_date)}</CardSubtitle>
														</Stack>

														<BoxButton onClick={() => router.push(`/products/${product.id}`)}>
															Detail
														</BoxButton>
													</CardItemContainer>
												</Grid>
											))}
										</Grid>
									</Section>
									<Section>
										<SectionTitle>Wishlist</SectionTitle>
										<Grid container spacing={1}>
											{customerData.wishlist.length === 0 && (
												<Grid item xs={12}>
													<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
														User&apos;s wishlist is empty.
													</Alert>
												</Grid>
											)}
											{customerData.wishlist.map(item => (
												<Grid item xs={12} key={item.id}>
													<CardItemContainer>
														<CardItemImage
															imageUrl={(item?.images || [])[0] || "/images/no-image.png"}
														/>
														<Stack justifyContent="center">
															<CardTitle>{item.title}</CardTitle>
															<CardSubtitle>{formatDateFull(item.created_at)}</CardSubtitle>
														</Stack>
														<BoxButton onClick={() => router.push(`/products/${item.product_id}`)}>
															Detail
														</BoxButton>
													</CardItemContainer>
												</Grid>
											))}
										</Grid>
									</Section>
									<Section>
										<SectionTitle>Owned Vouchers</SectionTitle>
										<Grid container spacing={1}>
											{customerData.vouchers.length === 0 && (
												<Grid item xs={12}>
													<Alert severity="info" sx={{ width: "100%", mt: 1 }}>
														No voucher found!
													</Alert>
												</Grid>
											)}
											{customerData.vouchers.map(voucher => (
												<Grid item xs={12} key={voucher.code}>
													<CardItemContainer>
														<CardItemImage sx={{ cursor: "default" }}>
															<DiscountIcon />
														</CardItemImage>
														<Stack justifyContent="center">
															<CardTitle>{voucher.title}</CardTitle>
															<CardSubtitle>
																Berlaku hingga {formatDateFullMonth(voucher.expiry_date)}
															</CardSubtitle>
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
																{voucher.code}
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
						{/* <ContentContainer>
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
					</ContentContainer> */}
					</>
				)}
			</CustomerDetailsContainer>
		</>
	);
};

export default CustomerDetails;
