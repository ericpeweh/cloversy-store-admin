// Dependencies
import React, { useState } from "react";
import { purple } from "@mui/material/colors";
import Head from "next/head";

// Styles
import {
	ContentContainer,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	VoucherDetailsContainer
} from "./VoucherDetails.styles";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Hooks
import { useGetVoucherDetailQuery } from "../../api/voucher.api";
import { useRouter } from "next/router";
import useSelector from "../../hooks/useSelector";

// Components
import {
	Alert,
	CircularProgress,
	Grid,
	IconButton,
	Link,
	Snackbar,
	Stack,
	Typography
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import AreaChart from "../../components/AreaChart/AreaChart";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";
import { formatDateFullMonth } from "../../utils/formatDate";
import formatToRupiah from "../../utils/formatToRupiah";
import UserListModal from "../../components/UserListModal/UserListModal";
import useModal from "../../hooks/useModal";

// Chart data
const data = [
	{
		name: "Jan",
		usage: 15
	},
	{
		name: "Feb",
		usage: 30
	},
	{
		name: "Mar",
		usage: 4
	},
	{
		name: "Apr",
		usage: 4
	},
	{
		name: "May",
		usage: 40
	},
	{
		name: "Jun",
		usage: 8
	},
	{
		name: "Jul",
		usage: 15
	},
	{
		name: "Aug",
		usage: 15
	},
	{
		name: "Sep",
		usage: 15
	},
	{
		name: "Okt",
		usage: 4
	},
	{
		name: "Nov",
		usage: 15
	},
	{
		name: "Dec",
		usage: 32
	}
];

const VoucherDetails = () => {
	const [successCopy, setSuccessCopy] = useState(false);
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { voucherCode } = router.query;

	const {
		data: getVoucherData,
		isLoading: isGetVoucherLoading,
		isSuccess: isGetVoucherSuccess,
		error: getVoucherError,
		refetch: refetchVoucher
	} = useGetVoucherDetailQuery(voucherCode, {
		skip: !isAuth || !voucherCode
	});
	const voucherError: any = getVoucherError;
	const voucherData = getVoucherData?.data.voucher;

	const {
		isOpen: isShowCustomerModalOpen,
		openHandler: showCustomerModalOpenHandler,
		closeHandler: showCustomerModalCloseHandler
	} = useModal();

	const copyVoucherCodeHandler = async () => {
		if (voucherData?.code) {
			await navigator.clipboard.writeText(voucherData?.code);
			setSuccessCopy(true);
		}
	};

	return (
		<>
			<Head>
				<title>Voucher Details | {voucherData?.code || "Loading..."}</title>
			</Head>
			<VoucherDetailsContainer>
				{voucherData && (
					<UserListModal
						open={isShowCustomerModalOpen}
						onClose={showCustomerModalCloseHandler}
						data={voucherData?.selectedUsers}
					/>
				)}
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={successCopy}
					onClose={() => setSuccessCopy(false)}
					message="Voucher code copied!"
					key={"voucher_code_copy"}
					autoHideDuration={1500}
				/>

				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<PageTitle sx={{ mb: 0 }}>Voucher Details</PageTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<Button
							startIcon={<ArrowBackIcon />}
							size="small"
							color="secondary"
							onClick={() => router.push("/vouchers")}
						>
							Go Back
						</Button>
						<Button
							startIcon={<EditIcon />}
							size="small"
							color="secondary"
							variant="outlined"
							onClick={() => router.push(`/vouchers/${voucherData?.code}/edit`)}
						>
							Edit Voucher
						</Button>
					</Stack>
				</Stack>
				{!isGetVoucherLoading && getVoucherError && (
					<FallbackContainer>
						<Alert severity="error">{voucherError.data.message}</Alert>
						<BoxButton onClick={refetchVoucher}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetVoucherLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{isGetVoucherSuccess && voucherData && (
					<ContentContainer>
						<Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
							<Grid item xs={12} xl={6}>
								<DetailsContainer>
									<DetailItem>
										<DetailTitle>Voucher Title</DetailTitle>
										<DetailDescription>{voucherData.title}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Code</DetailTitle>
										<Stack direction="row" alignItems="center" gap={1}>
											<DetailDescription>{voucherData.code}</DetailDescription>
											<IconButton size="small" onClick={copyVoucherCodeHandler}>
												<ContentCopyIcon fontSize="small" />
											</IconButton>
										</Stack>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Expiry Date</DetailTitle>
										<DetailDescription>
											{formatDateFullMonth(voucherData.expiry_date)}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Discount</DetailTitle>
										<DetailDescription>
											-{" "}
											{voucherData.discount_type === "value"
												? formatToRupiah(voucherData.discount)
												: `${voucherData.discount}% / Percent`}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Status</DetailTitle>
										<DetailDescription>
											<Stack justifyContent="flex-end">
												<StatusBadge color={voucherData.status === "active" ? "primary" : "error"}>
													{voucherData.status}
												</StatusBadge>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Scope</DetailTitle>
										<DetailDescription>
											<Stack justifyContent="flex-start" direction="row">
												<StatusBadge color="secondary">{voucherData.voucher_scope}</StatusBadge>
												{voucherData.voucher_scope === "user" && (
													<Link sx={{ ml: 2 }} onClick={showCustomerModalOpenHandler}>
														<Typography
															sx={{
																cursor: "pointer",
																fontWeight: 500,
																fontSize: {
																	xs: "1.4rem",
																	sm: "1.5rem",
																	md: "1.6rem"
																}
															}}
														>
															{voucherData.selectedUsers.length} User
														</Typography>
													</Link>
												)}
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Description</DetailTitle>
										<DetailDescription>
											{voucherData.description || "No description provided."}
										</DetailDescription>
									</DetailItem>
								</DetailsContainer>
							</Grid>
							<Grid item xs={12} xl={6}>
								<AreaChart
									title="Statistik Penggunaan"
									data={data}
									dataKey="usage"
									fillColor={purple[100]}
									strokeColor={purple[200]}
								/>
							</Grid>
						</Grid>
					</ContentContainer>
				)}
			</VoucherDetailsContainer>
		</>
	);
};

export default VoucherDetails;
