// Dependencies
import React, { useState } from "react";
import Head from "next/head";

// Styles
import {
	ContentContainer,
	DetailDescription,
	DetailItem,
	DetailsContainer,
	DetailTitle,
	NotificationDetailsContainer
} from "./NotificationDetails.styles";

// Hooks
import { useGetNotifMarketingDetailQuery } from "../../api/marketing.api";
import useSelector from "../../hooks/useSelector";
import { useRouter } from "next/router";
import useModal from "../../hooks/useModal";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// Utils
import isDateBeforeCurrentTime from "../../utils/isDateBeforeCurrentTime";
import { formatDateFullWithDay } from "../../utils/formatDate";

// Components
import {
	Alert,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Link,
	Snackbar,
	Stack
} from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";
import UserListModal from "../../components/UserListModal/UserListModal";

const NotificationDetails = () => {
	const [successCopy, setSuccessCopy] = useState(false);
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { notifMarketingId } = router.query;

	const {
		data: getNotifMarketingData,
		isLoading: isGetNotifMarketingLoading,
		isSuccess: isGetNotifMarketingSuccess,
		error: getNotifMarketingError,
		refetch: refetchNotifMarketing
	} = useGetNotifMarketingDetailQuery(notifMarketingId, {
		skip: !isAuth || !notifMarketingId
	});
	const notifMarketingError: any = getNotifMarketingError;
	const notifMarketingData = getNotifMarketingData?.data.notifMarketing;

	const {
		isOpen: isShowTargetsModalOpen,
		openHandler: showTargetsModalOpenHandler,
		closeHandler: showTargetsModalCloseHandler
	} = useModal();

	const copyNotificationCodeHandler = async () => {
		if (notifMarketingData?.notification_code) {
			await navigator.clipboard.writeText(notifMarketingData?.notification_code);
			setSuccessCopy(true);
		}
	};

	const targetText = `${notifMarketingData?.selectedUsers?.length} ${
		(notifMarketingData?.selectedUsers.length || 0) > 1 ? "Customers" : "Customer"
	}`;

	return (
		<>
			<Head>
				<title>
					Notification Marketing Details | {notifMarketingData?.notification_code || "Loading..."}
				</title>
			</Head>
			<NotificationDetailsContainer>
				{notifMarketingData && (
					<UserListModal
						open={isShowTargetsModalOpen}
						onClose={showTargetsModalCloseHandler}
						data={notifMarketingData?.selectedUsers}
					/>
				)}
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={successCopy}
					onClose={() => setSuccessCopy(false)}
					message="Notification code copied!"
					key={"notification_code_copy"}
					autoHideDuration={1500}
				/>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<PageTitle sx={{ mb: 0 }}>Notification Details</PageTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<Button
							startIcon={<ArrowBackOutlinedIcon />}
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
							onClick={() => router.push(`/marketing/notification/${notifMarketingData?.id}/edit`)}
						>
							Edit Item
						</Button>
					</Stack>
				</Stack>
				{!isGetNotifMarketingLoading && getNotifMarketingError && (
					<FallbackContainer>
						<Alert severity="error">{notifMarketingError.data.message}</Alert>
						<BoxButton onClick={refetchNotifMarketing}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetNotifMarketingLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetNotifMarketingLoading && isGetNotifMarketingSuccess && notifMarketingData && (
					<ContentContainer>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<DetailsContainer>
									<SectionTitle>Notification Information</SectionTitle>
									<DetailItem>
										<DetailTitle>Title</DetailTitle>
										<DetailDescription>{notifMarketingData.title}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Notification code</DetailTitle>
										<Stack direction="row" alignItems="center" gap={1}>
											<DetailDescription>{notifMarketingData.notification_code}</DetailDescription>
											<IconButton size="small" onClick={copyNotificationCodeHandler}>
												<ContentCopyIcon fontSize="small" />
											</IconButton>
										</Stack>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Target</DetailTitle>
										<Link sx={{ cursor: "pointer" }} onClick={showTargetsModalOpenHandler}>
											<DetailDescription>{targetText}</DetailDescription>
										</Link>
										<DetailDescription>
											&nbsp; (
											{notifMarketingData.send_to === "all"
												? "All subscribed customers"
												: "Selected customers"}
											)
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Status</DetailTitle>
										<DetailDescription>
											<Stack justifyContent="flex-end">
												<StatusBadge
													color={
														notifMarketingData.sent_at
															? "primary"
															: isDateBeforeCurrentTime(notifMarketingData?.scheduled || "")
															? "warning"
															: "secondary"
													}
												>
													{notifMarketingData.sent_at
														? "Sent"
														: isDateBeforeCurrentTime(notifMarketingData?.scheduled || "")
														? "Expired"
														: "Scheduled"}
												</StatusBadge>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Description</DetailTitle>
										<DetailDescription>
											{notifMarketingData.description || "No description provided."}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Created</DetailTitle>
										<DetailDescription>
											{formatDateFullWithDay(notifMarketingData.created_at)}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Scheduled</DetailTitle>
										<DetailDescription>
											{notifMarketingData.scheduled
												? formatDateFullWithDay(notifMarketingData.scheduled)
												: "Not scheduled."}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Sent</DetailTitle>
										<DetailDescription>
											{notifMarketingData.sent_at
												? formatDateFullWithDay(notifMarketingData.sent_at)
												: "Not sent yet"}
										</DetailDescription>
									</DetailItem>
									{notifMarketingData.sent_at && (
										<>
											<DetailItem>
												<DetailTitle>Success count</DetailTitle>
												<DetailDescription>
													{notifMarketingData.success_count} subscriptions
												</DetailDescription>
											</DetailItem>
											<DetailItem>
												<DetailTitle>Failure count</DetailTitle>
												<DetailDescription>
													{notifMarketingData.failure_count} subscriptions
												</DetailDescription>
											</DetailItem>
										</>
									)}
								</DetailsContainer>
							</Grid>
							<Grid item xs={12} md={6}>
								<DetailsContainer>
									<SectionTitle>Message Information</SectionTitle>
									<DetailItem>
										<DetailTitle>Message title</DetailTitle>
										<DetailDescription>{notifMarketingData.message_title}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Message body</DetailTitle>
										<DetailDescription>{notifMarketingData.message_body}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Action title</DetailTitle>
										<DetailDescription>{notifMarketingData.action_title || "-"}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Action link</DetailTitle>
										<DetailDescription>{notifMarketingData.action_link || "-"}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Image URL</DetailTitle>
										{/* <Box sx={{ display: "flex", width: "100%" }}> */}
										<DetailDescription sx={{ wordBreak: "break-all" }}>
											{notifMarketingData.image_url || "-"}
										</DetailDescription>
										{/* </Box> */}
									</DetailItem>
								</DetailsContainer>
							</Grid>
						</Grid>
					</ContentContainer>
				)}
			</NotificationDetailsContainer>
		</>
	);
};

export default NotificationDetails;
