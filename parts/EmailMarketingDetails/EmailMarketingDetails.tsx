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
	EmailMarketingDetailsContainer
} from "./EmailMarketingDetails.styles";

// Hooks
import {
	useGetEmailMarketingDetailQuery,
	useGetEmailTemplatesQuery
} from "../../api/marketing.api";
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
import { Alert, CircularProgress, Grid, IconButton, Link, Snackbar, Stack } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import BoxButton from "../../components/BoxButton/BoxButton";
import UserListModal from "../../components/UserListModal/UserListModal";
import ResultPreview from "../../components/ResultPreview/ResultPreview";

const EmailMarketingDetails = () => {
	const [successCopy, setSuccessCopy] = useState(false);
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { emailMarketingId } = router.query;

	const {
		data: getEmailMarketingData,
		isLoading: isGetEmailMarketingLoading,
		isSuccess: isGetEmailMarketingSuccess,
		error: getEmailMarketingError,
		refetch: refetchEmailMarketing
	} = useGetEmailMarketingDetailQuery(emailMarketingId, {
		skip: !isAuth || !emailMarketingId
	});
	const emailMarketingError: any = getEmailMarketingError;
	const emailMarketingData = getEmailMarketingData?.data.emailMarketing;

	const {
		isOpen: isShowTargetsModalOpen,
		openHandler: showTargetsModalOpenHandler,
		closeHandler: showTargetsModalCloseHandler
	} = useModal();

	const copyNotificationCodeHandler = async () => {
		if (emailMarketingData?.notification_code) {
			await navigator.clipboard.writeText(emailMarketingData?.notification_code);
			setSuccessCopy(true);
		}
	};

	const targetText = `${emailMarketingData?.selectedUsers?.length} ${
		(emailMarketingData?.selectedUsers.length || 0) > 1 ? "Customers" : "Customer"
	}`;

	// Fetch email templates
	const { data: emailTemplatesData, isSuccess: isGetEmailTemplatesSuccess } =
		useGetEmailTemplatesQuery(isAuth, {
			skip: !isAuth
		});

	return (
		<>
			<Head>
				<title>
					Email Marketing Details | {emailMarketingData?.notification_code || "Loading..."}
				</title>
			</Head>
			<EmailMarketingDetailsContainer>
				{emailMarketingData && (
					<UserListModal
						open={isShowTargetsModalOpen}
						onClose={showTargetsModalCloseHandler}
						data={emailMarketingData?.selectedUsers}
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
					<PageTitle sx={{ mb: 0 }}>Email Marketing Details</PageTitle>
					<Stack direction="row" alignItems="center" gap={1}>
						<Button
							startIcon={<ArrowBackOutlinedIcon />}
							size="small"
							color="secondary"
							onClick={() => router.push("/marketing")}
						>
							Go Back
						</Button>
						<Button
							startIcon={<EditIcon />}
							size="small"
							color="secondary"
							variant="outlined"
							onClick={() => router.push(`/marketing/email/${emailMarketingData?.id}/edit`)}
						>
							Edit Item
						</Button>
					</Stack>
				</Stack>
				{!isGetEmailMarketingLoading && getEmailMarketingError && (
					<FallbackContainer>
						<Alert severity="error">{emailMarketingError.data.message}</Alert>
						<BoxButton onClick={refetchEmailMarketing}>Try again</BoxButton>
					</FallbackContainer>
				)}
				{isGetEmailMarketingLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isGetEmailMarketingLoading && isGetEmailMarketingSuccess && emailMarketingData && (
					<ContentContainer>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<DetailsContainer>
									<SectionTitle>Email Marketing Information</SectionTitle>
									<DetailItem>
										<DetailTitle>Title</DetailTitle>
										<DetailDescription>{emailMarketingData.title}</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Notification code</DetailTitle>
										<Stack direction="row" alignItems="center" gap={1}>
											<DetailDescription>{emailMarketingData.notification_code}</DetailDescription>
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
										<DetailDescription>&nbsp; (Selected customers)</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Status</DetailTitle>
										<DetailDescription>
											<Stack justifyContent="flex-end">
												<StatusBadge
													color={
														emailMarketingData.canceled
															? "error"
															: emailMarketingData.sent_at
															? "primary"
															: isDateBeforeCurrentTime(emailMarketingData?.scheduled || "")
															? "warning"
															: "info"
													}
												>
													{emailMarketingData.canceled
														? "Canceled"
														: emailMarketingData.sent_at
														? "Sent"
														: isDateBeforeCurrentTime(emailMarketingData?.scheduled || "")
														? "Expired"
														: "Scheduled"}
												</StatusBadge>
											</Stack>
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Description</DetailTitle>
										<DetailDescription>
											{emailMarketingData.description || "No description provided."}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Created</DetailTitle>
										<DetailDescription>
											{formatDateFullWithDay(emailMarketingData.created_at)}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Scheduled</DetailTitle>
										<DetailDescription>
											{emailMarketingData.scheduled
												? formatDateFullWithDay(emailMarketingData.scheduled)
												: "Not scheduled."}
										</DetailDescription>
									</DetailItem>
									<DetailItem>
										<DetailTitle>Sent</DetailTitle>
										<DetailDescription>
											{emailMarketingData.sent_at
												? formatDateFullWithDay(emailMarketingData.sent_at)
												: "Not sent yet"}
										</DetailDescription>
									</DetailItem>
									{emailMarketingData.sent_at && (
										<>
											<DetailItem>
												<DetailTitle>Success count</DetailTitle>
												<DetailDescription>
													{emailMarketingData.success_count}{" "}
													{emailMarketingData.success_count > 1 ? "emails" : "email"}
												</DetailDescription>
											</DetailItem>
											<DetailItem>
												<DetailTitle>Failure count</DetailTitle>
												<DetailDescription>
													{emailMarketingData.failure_count}{" "}
													{emailMarketingData.failure_count > 1 ? "emails" : "email"}
												</DetailDescription>
											</DetailItem>
										</>
									)}
								</DetailsContainer>
							</Grid>
							<Grid item xs={12} md={6}>
								<DetailsContainer>
									<SectionTitle>Email Information</SectionTitle>
									<DetailItem>
										<DetailTitle>Email subject</DetailTitle>
										<DetailDescription>{emailMarketingData.email_subject}</DetailDescription>
									</DetailItem>
									{Object.entries(emailMarketingData.params).map(([key, value]) => (
										<DetailItem key={key}>
											<DetailTitle>{key}</DetailTitle>
											<DetailDescription sx={{ wordBreak: "break-all" }}>{value}</DetailDescription>
										</DetailItem>
									))}
								</DetailsContainer>
							</Grid>
							{isGetEmailTemplatesSuccess &&
								emailTemplatesData &&
								emailMarketingData &&
								isGetEmailMarketingSuccess && (
									<Grid item xs={12}>
										<DetailsContainer>
											<ResultPreview
												emailsTemplate={emailTemplatesData.data.emailsTemplate}
												templateId={emailMarketingData.template_id}
												values={emailMarketingData}
												options={{ type: "detail", showDivider: false }}
											/>
										</DetailsContainer>
									</Grid>
								)}
						</Grid>
					</ContentContainer>
				)}
			</EmailMarketingDetailsContainer>
		</>
	);
};

export default EmailMarketingDetails;
