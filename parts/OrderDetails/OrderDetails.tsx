// Dependencies
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Styles
import {
	Address,
	AddressContainer,
	AddressName,
	AddressNumber,
	ContentContainer,
	ContentHeader,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	ImageContainer,
	InfoContainer,
	InfoDescription,
	InfoTitle,
	OrderCardContainer,
	OrderDate,
	OrderDetailsContainer,
	OrderNumber,
	Section,
	SectionTitle,
	TotalPriceText
} from "./OrderDetails.styles";

// Utils
import getOrderStatus from "../../utils/getOrderStatus";
import formatToRupiah from "../../utils/formatToRupiah";
import { formatDateFull } from "../../utils/formatDate";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Hooks
import useSelector from "../../hooks/useSelector";
import {
	useGetTransactionDetailsQuery,
	useUpdateTransactionMutation,
	useUpdateTransactionStatusMutation
} from "../../api/transaction.api";
import { useGetOrderReviewsQuery } from "../../api/review.api";

// Components
import {
	Alert,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	Snackbar,
	Stack,
	Tooltip,
	Link
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import BoxButton from "../../components/BoxButton/BoxButton";
import SelectInput from "../../components/SelectInput/SelectInput";
import OrderCard from "../../components/OrderCard/OrderCard";
import TextInput from "../../components/TextInput/TextInput";
import Timeline from "../../components/Timeline/Timeline";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import { TransactionStatus } from "../../interfaces";

const OrderDetails = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { orderId } = router.query;
	const [successCopyTransactionNumber, setSuccessCopyTransactionNumber] = useState(false);
	const [successCopyTrackingCode, setSuccessCopyTrackingCode] = useState(false);
	const [successCopyEmail, setSuccessCopyEmail] = useState(false);
	const [successCopyContact, setSuccessCopyContact] = useState(false);

	// Order / transaction data
	const {
		data: resultData,
		isLoading: isGetOrderLoading,
		isSuccess: isGetOrderSuccess,
		error: getOrderErrorData,
		refetch: refetchOrder,
		isUninitialized: isGetOrderUninitialized
	} = useGetTransactionDetailsQuery(orderId as string, { skip: !isAuth });
	const getOrderError: any = getOrderErrorData;
	const orderData = resultData?.data.transaction;

	const orderStatus = getOrderStatus(orderData?.order_status || "pending");
	const shipping = orderData?.shipping_details;
	const payment = orderData?.payment_details;
	const items = orderData?.item_details;

	// Order status
	const [orderStatusInput, setOrderStatusInput] = useState<TransactionStatus>(
		orderData?.order_status || "pending"
	);

	useEffect(() => {
		if (orderData?.order_status) {
			setOrderStatusInput(orderData.order_status);
		}
	}, [orderData?.order_status]);

	// Reviews data
	const {
		data: getOrderReviews,
		isLoading: isGetReviewsLoading,
		error: getReviewsErrorData,
		refetch: refetchReviews
	} = useGetOrderReviewsQuery(orderId as string, { skip: !isAuth });
	const getReviewsError: any = getReviewsErrorData;
	const reviewsData = getOrderReviews?.data.reviews;

	const [orderNoteInput, setOrderNoteInput] = useState(orderData?.order_note || "");

	useEffect(() => {
		if (orderData?.order_note) {
			setOrderNoteInput(orderData.order_note);
		}
	}, [orderData?.order_note]);

	const [
		updateOrderNote,
		{
			isLoading: isUpdateOrderNoteLoading,
			error: updateOrderNoteErrorData,
			reset: resetUpdateOrderNote
		}
	] = useUpdateTransactionMutation();
	const updateOrderNoteError: any = updateOrderNoteErrorData;

	const updateOrderNoteHandler = async () => {
		if (!orderData?.id) return;

		await updateOrderNote({ transactionId: orderData?.id, orderNote: orderNoteInput });

		resetUpdateOrderNote();
	};

	const [
		updateTransactionStatus,
		{
			isLoading: isUpdateTransactionStatusLoading,
			error: updateTransactionStatusErrorData,
			reset: resetUpdateTransactionStatus
		}
	] = useUpdateTransactionStatusMutation();
	const updateTransactionStatusError: any = updateTransactionStatusErrorData;

	const updateTransactionStatusHandler = async () => {
		if (!orderData?.id) return;
		if (orderData?.order_status === orderStatusInput) return;

		await updateTransactionStatus({ transactionId: orderData?.id, orderStatus: orderStatusInput });

		resetUpdateTransactionStatus();
	};

	const copyTransactionNumberHandler = async () => {
		await navigator.clipboard.writeText(orderData?.id || "");
		setSuccessCopyTransactionNumber(true);
	};

	const copyTrackingCodeHandler = async () => {
		await navigator.clipboard.writeText(shipping?.shipping_tracking_code || "");
		setSuccessCopyTrackingCode(true);
	};

	const copyCustomerEmailHandler = async () => {
		await navigator.clipboard.writeText(orderData?.email || "");
		setSuccessCopyEmail(true);
	};

	const copyCustomerContactHandler = async () => {
		await navigator.clipboard.writeText(orderData?.contact || "");
		setSuccessCopyContact(true);
	};

	return (
		<OrderDetailsContainer>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyContact}
				onClose={() => setSuccessCopyContact(false)}
				message="Kontak telah disalin!"
				key={"contact_copy"}
				autoHideDuration={1500}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyEmail}
				onClose={() => setSuccessCopyEmail(false)}
				message="Email telah disalin!"
				key={"email_copy"}
				autoHideDuration={1500}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyTransactionNumber}
				onClose={() => setSuccessCopyTransactionNumber(false)}
				message="No transaksi telah disalin!"
				key={"transaction_number_copy"}
				autoHideDuration={1500}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successCopyTrackingCode}
				onClose={() => setSuccessCopyTrackingCode(false)}
				message="Nomor resi pengiriman telah disalin!"
				key={"tracking_code_copy"}
				autoHideDuration={1500}
			/>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PageTitle sx={{ mb: 0 }}>Order Details</PageTitle>
				<Stack direction="row" alignItems="center" gap={1}>
					<Button
						startIcon={<ArrowBackIcon />}
						size="small"
						color="secondary"
						onClick={() => router.back()}
					>
						Go Back
					</Button>
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="secondary"
						variant="outlined"
						onClick={() => router.push(`/orders/${orderData?.id}/edit`)}
					>
						Edit order
					</Button>
				</Stack>
			</Stack>
			{(isGetOrderUninitialized || isGetOrderLoading) && (
				<FallbackContainer>
					<CircularProgress />
				</FallbackContainer>
			)}
			{!isGetOrderLoading && getOrderError && (
				<FallbackContainer>
					<Alert severity="error" sx={{ mb: 2 }}>
						{getOrderError?.data.message}
					</Alert>
					<BoxButton onClick={refetchOrder}>Try again</BoxButton>
				</FallbackContainer>
			)}
			{isGetOrderSuccess && orderData && shipping && payment && items && (
				<>
					<ContentHeader>
						<Stack>
							<OrderNumber>
								No Invoice: {orderData.id}
								<IconButton size="small" onClick={copyTransactionNumberHandler}>
									<ContentCopyIcon fontSize="small" />
								</IconButton>
							</OrderNumber>
							<OrderDate>
								<CalendarTodayIcon fontSize="small" />
								{formatDateFull(orderData.created_at)}
							</OrderDate>
						</Stack>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							gap={1}
							sx={{
								height: {
									xs: "auto",
									sm: "4rem"
								},
								width: {
									xs: "100%",
									sm: "auto"
								}
							}}
						>
							{orderData.order_status !== "success" && orderData.order_status !== "cancel" && (
								<>
									<SelectInput
										options={[
											{ label: "Pending", value: "pending" },
											{ label: "Process", value: "process" },
											{ label: "Sent", value: "sent" },
											{ label: "Success", value: "success" },
											{ label: "Cancel", value: "cancel" }
										]}
										value={orderStatusInput}
										onChange={e => setOrderStatusInput(e.target.value as TransactionStatus)}
										label=""
										size="small"
										sx={{ width: { xs: "100%", sm: "25rem" } }}
									/>
									<BoxButton
										sx={{ mr: { xs: 0, sm: 1 } }}
										onClick={updateTransactionStatusHandler}
										loading={isUpdateTransactionStatusLoading}
									>
										Save
									</BoxButton>
								</>
							)}
							<BoxButton sx={{ backgroundColor: "#555", color: "#fff" }}>
								<PrintIcon />
							</BoxButton>
						</Stack>
					</ContentHeader>
					{updateTransactionStatusError && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{updateTransactionStatusError?.data?.message}
						</Alert>
					)}
					<Divider />
					<ContentContainer>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<DetailsContainer>
									<DetailItem>
										<DetailTitle>Customer</DetailTitle>
										<DetailDescription>
											<Link
												sx={{ cursor: "pointer" }}
												onClick={() => router.push(`/customers/${orderData.user_id}`)}
											>
												{orderData.full_name}
											</Link>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle sx={{ mt: 0.5 }}>Email</DetailTitle>
										<Stack direction="row" alignItems="center" gap={1}>
											<DetailDescription>{orderData.email}</DetailDescription>
											<IconButton size="small" onClick={copyCustomerEmailHandler}>
												<ContentCopyIcon fontSize="small" />
											</IconButton>
										</Stack>
									</DetailItem>
									<DetailItem>
										<DetailTitle sx={{ mt: 0.5 }}>Contact</DetailTitle>
										<Stack direction="row" alignItems="center" gap={1}>
											<DetailDescription>{orderData.contact}</DetailDescription>
											<IconButton size="small" onClick={copyCustomerContactHandler}>
												<ContentCopyIcon fontSize="small" />
											</IconButton>
										</Stack>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Order status</DetailTitle>
										<DetailDescription>
											<Stack
												justifyContent="flex-start"
												direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
												gap={1}
											>
												<StatusBadge centerText color={orderStatus.color}>
													{orderStatus.label}
												</StatusBadge>
												<p>| Modified: {formatDateFull(orderData.order_status_modified)}</p>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Payment status</DetailTitle>
										<DetailDescription>
											<Stack
												justifyContent="flex-start"
												direction={{ xs: "column", sm: "row", md: "column", xl: "row" }}
												gap={1}
											>
												<StatusBadge color="secondary">{payment.payment_status}</StatusBadge>{" "}
												<p>| Modified: {formatDateFull(payment.payment_status_modified)}</p>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Review status</DetailTitle>
										<DetailDescription>
											<Stack justifyContent="flex-start" direction={"row"} gap={1}>
												<StatusBadge color={orderData.is_reviewed ? "primary" : "warning"}>
													{orderData.is_reviewed ? "Sudah Review" : "Belum Review"}
												</StatusBadge>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Coupon</DetailTitle>
										{orderData.voucher_code ? (
											<DetailDescription>
												{orderData.voucher_title} ( -
												{orderData.voucher_discount_type === "value"
													? formatToRupiah(orderData.voucher_discount)
													: `${orderData.voucher_discount}%`}{" "}
												) |{" "}
												<Link
													sx={{ cursor: "pointer" }}
													onClick={() => router.push(`/vouchers/${orderData.voucher_code}`)}
												>
													{orderData.voucher_code}
												</Link>
											</DetailDescription>
										) : (
											<DetailDescription>-</DetailDescription>
										)}
									</DetailItem>
									<DetailItem>
										<DetailTitle>Customer note</DetailTitle>
										<DetailDescription sx={{ whiteSpace: "pre-wrap" }}>
											{orderData.customer_note || "-"}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Order note</DetailTitle>
										<DetailDescription>
											<TextInput
												multiline
												rows={5}
												id="orderNote"
												label=""
												value={orderNoteInput}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													setOrderNoteInput(e.target.value)
												}
											/>
											<Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
												<Button
													size="small"
													loading={isUpdateOrderNoteLoading}
													onClick={updateOrderNoteHandler}
												>
													Save Note
												</Button>
											</Stack>
											{!isUpdateOrderNoteLoading && updateOrderNoteError && (
												<Alert severity="error" sx={{ mt: 1 }}>
													{updateOrderNoteError.data.message}
												</Alert>
											)}
										</DetailDescription>
									</DetailItem>
								</DetailsContainer>
							</Grid>
							<Grid item xs={12} md={6}>
								<Section>
									<SectionTitle>Detail Pesanan</SectionTitle>
									<OrderCardContainer>
										{items.map(item => (
											<OrderCard
												productId={item.product_id}
												clickable={true}
												key={item.product_id + item.product_size}
												title={item.title}
												sizeDesc={`EU ${item.product_size}`}
												qtyDesc={item.quantity.toString()}
												price={formatToRupiah(+item.price * +item.quantity)}
												imageUrl={(item?.images || [])[0] || "/images/no-image.png"}
											/>
										))}
									</OrderCardContainer>
								</Section>
								<Section>
									<SectionTitle>Rincian Pembayaran</SectionTitle>
									<InfoContainer>
										<InfoTitle>Metode Pembayaran</InfoTitle>
										<Stack direction="row" gap={2} alignItems="center">
											<ImageContainer>
												<Image
													src={`/images/${payment.payment_method}.png`}
													alt={"payment method logo"}
													height={200}
													width={400}
													layout="responsive"
												/>
											</ImageContainer>
											<InfoDescription>
												{payment.payment_method === "gopay"
													? "Gopay"
													: `${payment.payment_method.toUpperCase()} Virtual Account`}
											</InfoDescription>
										</Stack>
									</InfoContainer>
									<Divider flexItem sx={{ mb: 1 }} />
									<InfoContainer>
										<InfoTitle>Subtotal Produk</InfoTitle>
										<InfoDescription>{formatToRupiah(+orderData.subtotal)}</InfoDescription>
									</InfoContainer>
									{+orderData.discount_total !== 0 && (
										<InfoContainer>
											<InfoTitle>Diskon / Potongan Harga</InfoTitle>
											<InfoDescription>{formatToRupiah(+orderData.discount_total)}</InfoDescription>
										</InfoContainer>
									)}
									<InfoContainer>
										<InfoTitle>Biaya Pengiriman</InfoTitle>
										<InfoDescription>{formatToRupiah(+shipping.shipping_cost)}</InfoDescription>
									</InfoContainer>
									<InfoContainer>
										<TotalPriceText>
											<strong>Total Pesanan</strong>
										</TotalPriceText>
										<TotalPriceText>
											<strong>{formatToRupiah(+orderData.total)}</strong>
										</TotalPriceText>
									</InfoContainer>
								</Section>
								{(orderData.customer_note || orderData.gift_note) && (
									<Section>
										<SectionTitle>Informasi lainnya</SectionTitle>
										{orderData.customer_note && (
											<Stack gap={0.5} mb={3}>
												<InfoTitle>Catatan pesanan: </InfoTitle>
												<InfoDescription>{orderData.customer_note}</InfoDescription>
											</Stack>
										)}
										{orderData.gift_note && (
											<Stack gap={0.5}>
												<InfoTitle>Catatan hadiah:</InfoTitle>
												<InfoDescription>{orderData.gift_note}</InfoDescription>
											</Stack>
										)}
									</Section>
								)}
							</Grid>
						</Grid>
					</ContentContainer>
					{!isGetReviewsLoading && getReviewsError && (
						<FallbackContainer>
							<Alert severity="error">{getReviewsError.data.message}</Alert>
							<BoxButton onClick={refetchReviews}>Try again</BoxButton>
						</FallbackContainer>
					)}
					{isGetReviewsLoading && (
						<FallbackContainer>
							<CircularProgress />
						</FallbackContainer>
					)}
					{reviewsData && reviewsData?.length !== 0 && (
						<ContentContainer>
							<Section>
								<SectionTitle>Reviews</SectionTitle>
								<Grid container sx={{ mt: { xs: 1, sm: 2 } }}>
									<Grid item xs={12}>
										<Grid container spacing={{ xs: 1, md: 2 }}>
											{reviewsData.map(review => (
												<Grid item xs={12} xl={6} key={review.id}>
													<ReviewItem
														reviewData={review}
														showProductTitle={true}
														openTransactionDetailsBtn={false}
														openEditReviewBtn={true}
													/>
												</Grid>
											))}
										</Grid>
									</Grid>
								</Grid>
							</Section>
						</ContentContainer>
					)}
					<ContentContainer>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<Section>
									<SectionTitle>Shipping</SectionTitle>
									<InfoContainer>
										<InfoTitle>Courier</InfoTitle>
										<Stack direction="row" gap={2} alignItems="center">
											<ImageContainer>
												<Image
													src={`/images/${shipping.shipping_courier}.png`}
													alt={"shipping courier logo"}
													height={200}
													width={400}
													layout="responsive"
												/>
											</ImageContainer>
											<InfoDescription>{`${shipping.shipping_courier.toUpperCase()} ${
												shipping.shipping_service
											} (${shipping.shipping_etd} hari)`}</InfoDescription>
										</Stack>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle>Tracking code</InfoTitle>
										<InfoDescription>
											{shipping.shipping_tracking_code && (
												<Tooltip title="Salin nomor resi">
													<IconButton sx={{ mr: 1 }} onClick={copyTrackingCodeHandler}>
														<ContentCopyIcon sx={{ fontSize: "1.8rem" }} />
													</IconButton>
												</Tooltip>
											)}
											{shipping.shipping_tracking_code || "Belum tersedia"}
										</InfoDescription>
									</InfoContainer>
									<AddressContainer>
										<InfoTitle>Recipient address :</InfoTitle>
										<AddressName>{shipping.recipient_name}</AddressName>
										<AddressNumber>{shipping.contact}</AddressNumber>
										<Address>{shipping.address}</Address>
										<Address>
											{shipping.province}, {shipping.city}
										</Address>
										<Address>
											{shipping.subdistrict}, {shipping.postal_code}
										</Address>
										<Divider sx={{ my: 1 }} />
										<Address>Label: {shipping.label || "-"}</Address>
										<Address>Catatan pengiriman: {shipping.shipping_note || "-"}</Address>
									</AddressContainer>
								</Section>
							</Grid>
							<Grid item xs={12} md={6}>
								<Section>
									<SectionTitle>Order Timeline</SectionTitle>
									<Timeline
										items={orderData.timeline.map(item => ({
											date: item.timeline_date,
											desc: item.description
										}))}
									/>
								</Section>
							</Grid>
						</Grid>
					</ContentContainer>
				</>
			)}
		</OrderDetailsContainer>
	);
};

export default OrderDetails;
