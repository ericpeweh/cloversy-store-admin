// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { DateTime } from "luxon";
import * as Yup from "yup";
import Head from "next/head";

// Styles
import { EditNotificationContainer, FormContainer, InputTitle } from "./EditNotification.styles";

// Types
import { UpdateNotifMarketingData, Customer, PushSubscriptionItem } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

// Hooks
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";
import { useGetPushSubscriptionsQuery } from "../../api/subscription.api";
import {
	useUpdateNotifMarketingMutation,
	useGetNotifMarketingDetailQuery
} from "../../api/marketing.api";
import { useRouter } from "next/router";

// Components
import { Alert, Grid, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import PerformantTextInput from "../../components/PerformantTextInput/PerformantTextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";
import useSelector from "../../hooks/useSelector";

interface UpdateNotifMarketingFormValues {
	title: string;
	scheduled: DateTimeType;
	description: string;
	message_title: string;
	message_body: string;
	image_url: string;
	action_link: string;
	action_title: string;
	sendTo: "all" | "selected";
	selectedUsers: { id: number; email: string }[];
	removeSelectedUsers: { id: number; email: string }[];
}

const UpdateNotifMarketingSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string(),
	message_title: Yup.string().required("Required"),
	message_body: Yup.string().required("Required"),
	image_url: Yup.string(),
	action_link: Yup.string(),
	action_title: Yup.string(),
	sendTo: Yup.string().oneOf(["all", "selected"], "Invalid value"),
	selectedUsers: Yup.array(),
	removeSelectedUsers: Yup.array()
});

const EditNotification = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { notifMarketingId } = router.query;
	const [pushSubscriptions, setPushSubscriptions] = useState<PushSubscriptionItem[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [scheduledNotification, setScheduledNotification] = useState<boolean>(false);
	const [originalSelectedUsers, setOriginalSelectedUsers] = useState<Partial<Customer>[]>([]);
	const [formInitialValues, setFormInitialValues] = useState<UpdateNotifMarketingFormValues>({
		title: "",
		description: "",
		scheduled: DateTime.now(),
		selectedUsers: [],
		removeSelectedUsers: [],
		message_title: "",
		message_body: "",
		image_url: "",
		action_link: "",
		action_title: "",
		sendTo: "all"
	});
	const searchQuery = useDebounce(searchInput, 500);

	const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const {
		isOpen: isSelectCustomerModalOpen,
		openHandler: selectCustomerModalOpenHandler,
		closeHandler: selectCustomerModalCloseHandler
	} = useModal();

	const {
		isOpen: isViewSelectCustomerModalOpen,
		openHandler: viewSelectCustomerModalOpenHandler,
		closeHandler: viewSelectCustomerModalCloseHandler
	} = useModal();

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
	const isNotificiationSent = notifMarketingData?.sent_at;

	// Set form initial values
	// Save original selectedUsers data to state
	useEffect(() => {
		if (isGetNotifMarketingSuccess && notifMarketingData) {
			setFormInitialValues({
				title: notifMarketingData.title,
				description: notifMarketingData.description ?? "",
				scheduled: notifMarketingData?.scheduled
					? DateTime.fromISO(notifMarketingData?.scheduled)
					: DateTime.now(),
				selectedUsers:
					notifMarketingData.selectedUsers?.length > 0
						? notifMarketingData.selectedUsers.map(user => ({
								id: user.user_id!,
								email: user.email || ""
						  }))
						: [],
				removeSelectedUsers: [],
				message_title: notifMarketingData.message_title,
				message_body: notifMarketingData.message_body,
				image_url: notifMarketingData.image_url ?? "",
				action_link: notifMarketingData.action_link ?? "",
				action_title: notifMarketingData.action_title ?? "",
				sendTo: notifMarketingData.send_to
			});

			if (notifMarketingData?.selectedUsers) {
				setOriginalSelectedUsers(notifMarketingData.selectedUsers);
			}

			if (notifMarketingData?.scheduled) {
				setScheduledNotification(true);
			}
		}
	}, [notifMarketingData, isGetNotifMarketingSuccess]);

	// Fetch push subscriptions API
	const {
		data: pushSubscriptionsData,
		isFetching: isGetPushSubscriptionsFetching,
		isLoading: isGetPushSubscriptionsLoading,
		isSuccess: isGetPushSubscriptionsSuccess,
		error: getPushSubscriptionsError
	} = useGetPushSubscriptionsQuery(
		{ q: searchQuery, page },
		{
			skip: !isSelectCustomerModalOpen
		}
	);
	const pushSubscriptionsError: any = getPushSubscriptionsError;

	// Update notif marketing API
	const [
		updateNotifMarketing,
		{
			data: updateNotifMarketingData,
			isLoading: isUpdateNotifMarketingLoading,
			error: updateNotifMarketingErrorData,
			isSuccess: isUpdateNotifMarketingSuccess,
			reset: resetUpdateNotifMarketing
		}
	] = useUpdateNotifMarketingMutation();
	const updateNotifMarketingError: any = updateNotifMarketingErrorData;
	const updatedNotifMarketingId = updateNotifMarketingData?.data.updatedNotifMarketing.id;

	const updateNotifMarketingHandler = (data: UpdateNotifMarketingData) => {
		updateNotifMarketing(data);
	};

	useEffect(() => {
		if (isUpdateNotifMarketingSuccess) {
			resetUpdateNotifMarketing();
			router.replace(`/marketing/notification/${updatedNotifMarketingId}`);
		}
	}, [isUpdateNotifMarketingSuccess, resetUpdateNotifMarketing, router, updatedNotifMarketingId]);

	// Handle push subscriptions target list pagination
	useEffect(() => {
		setPushSubscriptions([]);
		setCurrentPage(0);
		setPage(1);
	}, [searchQuery]);

	useEffect(() => {
		if (pushSubscriptionsData && isGetPushSubscriptionsSuccess && !isGetPushSubscriptionsFetching) {
			if (currentPage < pushSubscriptionsData.page) {
				setPushSubscriptions(prev => [...prev, ...pushSubscriptionsData.data.subscriptions]);
				setCurrentPage(pushSubscriptionsData.page);
			}
		}
	}, [
		pushSubscriptionsData,
		currentPage,
		isGetPushSubscriptionsSuccess,
		isGetPushSubscriptionsFetching
	]);

	const loadMoreHandler = () => {
		setPage(prev => prev + 1);
	};

	const selectUserModalHandler = (
		isSelected: boolean,
		selectedUser: { id: number; email: string },
		values: UpdateNotifMarketingFormValues,
		setFieldValue: Function
	) => {
		const existInOriginal =
			originalSelectedUsers.findIndex(user => user.user_id === selectedUser.id) !== -1;

		if (isSelected) {
			// Remove from selection
			const updatedSelectedData = values.selectedUsers.filter(data => data.id !== selectedUser.id);
			setFieldValue("selectedUsers", updatedSelectedData);

			if (existInOriginal) {
				setFieldValue("removeSelectedUsers", [...values.removeSelectedUsers, selectedUser]);
			}
		} else {
			// Add to selection
			const updatedSelectedData = [...values.selectedUsers, selectedUser];
			setFieldValue("selectedUsers", updatedSelectedData);

			if (existInOriginal) {
				setFieldValue(
					"removeSelectedUsers",
					values.removeSelectedUsers.filter(user => user.id !== selectedUser.id)
				);
			}
		}
	};

	return (
		<>
			<Head>
				<title>
					Edit Notification Marketing | {notifMarketingData?.notification_code || "Loading..."}
				</title>
			</Head>
			<EditNotificationContainer>
				<Formik
					initialValues={formInitialValues}
					validationSchema={UpdateNotifMarketingSchema}
					onSubmit={(
						{ removeSelectedUsers, selectedUsers, scheduled, ...values },
						{ setFieldError }
					) => {
						if (scheduledNotification && !scheduled.isValid) {
							setFieldError("scheduled", "Invalid date");
							return;
						}

						if (notifMarketingData) {
							updateNotifMarketingHandler({
								notifMarketingId: notifMarketingData.id,
								...values,
								selectedUserIds:
									values.sendTo === "selected"
										? selectedUsers
												.filter(
													user =>
														originalSelectedUsers.findIndex(
															originalUser => originalUser.user_id === user.id
														) === -1
												)
												.map(user => user.id)
										: [],
								removedUserIds: removeSelectedUsers.map(user => user.id),
								scheduled: scheduledNotification ? scheduled.toISO().slice(0, 23) : null
							});
						}
					}}
					enableReinitialize={true}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						setFieldError,
						setTouched
					}) => (
						<>
							{!isNotificiationSent && (
								<>
									{/* Real user selection */}
									<UserPickerModal
										open={isSelectCustomerModalOpen}
										onClose={selectCustomerModalCloseHandler}
										data={pushSubscriptions}
										page={currentPage}
										totalPages={pushSubscriptionsData?.totalPages || 0}
										searchQuery={searchInput}
										onSearchQueryChange={searchQueryChangeHandler}
										onLoadMore={loadMoreHandler}
										onSelect={(isSelected: boolean, selectedUser: { id: number; email: string }) =>
											selectUserModalHandler(isSelected, selectedUser, values, setFieldValue)
										}
										manualOnSelect={true}
										selectedData={values.selectedUsers}
										isLoading={isGetPushSubscriptionsLoading}
										isFetching={isGetPushSubscriptionsFetching}
										error={pushSubscriptionsError}
									/>
									{/* View selected customer */}
									<UserPickerModal
										open={isViewSelectCustomerModalOpen}
										onClose={viewSelectCustomerModalCloseHandler}
										data={pushSubscriptions.filter(
											item => values.selectedUsers.findIndex(user => user.id === item.id) !== -1
										)}
										page={currentPage}
										totalPages={0}
										searchQuery={searchInput}
										onSearchQueryChange={() => {}}
										onLoadMore={() => {}}
										onSelect={(isSelected: boolean, selectedUser: { id: number; email: string }) =>
											selectUserModalHandler(isSelected, selectedUser, values, setFieldValue)
										}
										manualOnSelect={true}
										selectedData={values.selectedUsers}
										isLoading={false}
										isFetching={false}
										error={false}
									/>
								</>
							)}
							<Stack
								direction={{ xs: "column", sm: "row" }}
								alignItems={{ xs: "flex-start", sm: "center" }}
								justifyContent="space-between"
							>
								<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Edit Notification</PageTitle>
								<Stack direction="row" alignItems="center" gap={1}>
									<Button
										size="small"
										color="secondary"
										variant="outlined"
										onClick={() => router.back()}
									>
										Discard
									</Button>
									<Button
										startIcon={<DoneIcon />}
										size="small"
										color="primary"
										onClick={() => handleSubmit()}
										loading={isUpdateNotifMarketingLoading}
									>
										Update Notification
									</Button>
								</Stack>
							</Stack>
							{updateNotifMarketingError && (
								<Alert severity="error" sx={{ mb: 1 }}>
									{updateNotifMarketingError?.data?.message}
								</Alert>
							)}
							<FormContainer>
								<Grid container spacing={{ xs: 1, sm: 3, lg: 4 }} alignItems="flex-start">
									<Grid item xs={12} md={6}>
										<Grid container spacing={{ xs: 2, md: 3 }}>
											<Grid item xs={12}>
												<InputTitle>Notification Detail</InputTitle>
												<PerformantTextInput
													name="title"
													label="Notification title"
													value={values.title}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.title && touched.title)}
												/>
											</Grid>
											<Grid item xs={12}>
												<PerformantTextInput
													label="Notification description"
													name="description"
													multiline
													rows={4}
													value={values.description}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</Grid>
											{!isNotificiationSent && (
												<>
													<Grid item xs={12}>
														<InputTitle>Notification Target</InputTitle>
														<Grid container spacing={{ xs: 1, sm: 2 }} rowSpacing={2}>
															<Grid
																item
																{...(values.sendTo === "selected"
																	? { xs: 7, lg: 8, xl: 9 }
																	: { xs: 12 })}
															>
																<SelectInput
																	options={[
																		{ label: "All subscribed customers", value: "all" },
																		{ label: "Selected customers", value: "selected" }
																	]}
																	name="sendTo"
																	value={values.sendTo}
																	label="Select target"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	error={Boolean(errors.sendTo && touched.sendTo)}
																/>
															</Grid>
															{values.sendTo === "selected" && (
																<Grid item xs={5} lg={4} xl={3}>
																	<Button
																		variant="outlined"
																		sx={{ height: "100%", width: "100%" }}
																		size="small"
																		onClick={selectCustomerModalOpenHandler}
																	>
																		Select User
																	</Button>
																</Grid>
															)}
															{values.sendTo === "selected" && (
																<Grid item xs={12}>
																	<Button
																		size="small"
																		startIcon={<GroupOutlinedIcon />}
																		onClick={viewSelectCustomerModalOpenHandler}
																	>
																		{values.selectedUsers.length || "No"}{" "}
																		{values.selectedUsers.length > 1 ? "Users" : "User"} Selected
																	</Button>
																</Grid>
															)}
														</Grid>
													</Grid>
													<Grid item xs={12}>
														<Checkbox
															label="Schedule notification"
															checked={scheduledNotification}
															onChange={setScheduledNotification}
														/>
													</Grid>
													{scheduledNotification && (
														<Grid item xs={12}>
															<DateTimePicker
																label="Trigger Time"
																value={values.scheduled}
																onChange={(value: DateTime) => {
																	if (!value.isValid) {
																		setFieldError("scheduled", "Invalid date");
																		return;
																	}
																	setFieldValue("scheduled", value);
																	setTouched({ scheduled: true });
																}}
															/>
															{errors.scheduled && touched.scheduled && (
																<Alert severity="error" sx={{ mt: 1 }}>
																	{errors?.scheduled + ""}
																</Alert>
															)}
														</Grid>
													)}
												</>
											)}
											{isNotificiationSent && (
												<Grid item xs={12}>
													<Alert severity="info">
														Only some fields can be edited because notification is already sent.
													</Alert>
												</Grid>
											)}
										</Grid>
									</Grid>
									<Grid item xs={12} md={6} spacing={3}>
										{!isNotificiationSent && (
											<Grid container spacing={{ xs: 2, md: 3 }}>
												<Grid item xs={12}>
													<InputTitle>Message Info</InputTitle>
													<PerformantTextInput
														name="message_title"
														label="Message title"
														value={values.message_title}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.message_title && touched.message_title)}
													/>
												</Grid>
												<Grid item xs={12}>
													<PerformantTextInput
														name="action_title"
														label="Action title"
														value={values.action_title}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.action_title && touched.action_title)}
													/>
												</Grid>
												<Grid item xs={12}>
													<PerformantTextInput
														name="action_link"
														label="Action link / URL"
														value={values.action_link}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.action_link && touched.action_link)}
													/>
												</Grid>
												<Grid item xs={12}>
													<PerformantTextInput
														name="image_url"
														label="Image link / URL"
														value={values.image_url}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.image_url && touched.image_url)}
													/>
												</Grid>
												<Grid item xs={12}>
													<PerformantTextInput
														label="Message body"
														name="message_body"
														multiline
														rows={4}
														value={values.message_body}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.message_body && touched.message_body)}
													/>
												</Grid>
											</Grid>
										)}
									</Grid>
								</Grid>
							</FormContainer>
						</>
					)}
				</Formik>
			</EditNotificationContainer>
		</>
	);
};

export default EditNotification;
