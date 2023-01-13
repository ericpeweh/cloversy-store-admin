// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { DateTime } from "luxon";
import * as Yup from "yup";

// Styles
import { AddNotificationContainer, FormContainer, InputTitle } from "./AddNotification.styles";

// Types
import { CreateNotifMarketingData, PushSubscriptionItem } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

// Hooks
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";
import { useGetPushSubscriptionsQuery } from "../../api/subscription.api";
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
import { useCreateNotifMarketingMutation } from "../../api/marketing.api";

interface AddNotifMarketingFormValues {
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
}

const CreateNotifMarketingSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string(),
	message_title: Yup.string().required("Required"),
	message_body: Yup.string().required("Required"),
	image_url: Yup.string(),
	action_link: Yup.string(),
	action_title: Yup.string(),
	sendTo: Yup.string().oneOf(["all", "selected"], "Invalid value"),
	selectedUsers: Yup.array()
});

const formInitialValues: AddNotifMarketingFormValues = {
	title: "",
	description: "",
	scheduled: DateTime.now(),
	selectedUsers: [],
	message_title: "",
	message_body: "",
	image_url: "",
	action_link: "",
	action_title: "",
	sendTo: "all"
};

const AddNotification = () => {
	const router = useRouter();
	const [pushSubscriptions, setPushSubscriptions] = useState<PushSubscriptionItem[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [scheduledNotification, setScheduledNotification] = useState<boolean>(false);
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

	// Create notif marketing API
	const [
		createNotifMarketing,
		{
			data: createNotifMarketingData,
			isLoading: isCreateNotifMarketingLoading,
			error: notifMarketingError,
			isSuccess: isCreateNotifMarketingSuccess,
			reset: resetCreateNotifMarketing
		}
	] = useCreateNotifMarketingMutation();
	const createNotifMarketingError: any = notifMarketingError;
	const newNotifMarketingId = createNotifMarketingData?.data.newNotifMarketing.id;

	const createNotifMarketingHandler = (data: CreateNotifMarketingData) =>
		createNotifMarketing(data);

	useEffect(() => {
		if (isCreateNotifMarketingSuccess) {
			resetCreateNotifMarketing();
			router.push(`/marketing/notification/${newNotifMarketingId}`);
		}
	}, [isCreateNotifMarketingSuccess, resetCreateNotifMarketing, router, newNotifMarketingId]);

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

	return (
		<AddNotificationContainer>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateNotifMarketingSchema}
				onSubmit={({ selectedUsers, scheduled, ...values }, { setFieldError }) => {
					if (scheduledNotification && !scheduled.isValid) {
						setFieldError("scheduled", "Invalid date");
						return;
					}

					createNotifMarketingHandler({
						...values,
						selectedUserIds: values.sendTo === "selected" ? selectedUsers.map(user => user.id) : [],
						scheduled: scheduledNotification ? scheduled.toISO().slice(0, 23) : null
					});
				}}
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
							onSelect={setFieldValue}
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
							onSelect={setFieldValue}
							selectedData={values.selectedUsers}
							isLoading={false}
							isFetching={false}
							error={false}
						/>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "flex-start", sm: "center" }}
							justifyContent="space-between"
						>
							<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Add Notification</PageTitle>
							<Stack direction="row" alignItems="center" gap={1}>
								<Button
									size="small"
									color="secondary"
									variant="outlined"
									onClick={() => router.replace("/marketing")}
								>
									Cancel
								</Button>
								<Button
									startIcon={<DoneIcon />}
									size="small"
									color="primary"
									onClick={() => handleSubmit()}
									loading={isCreateNotifMarketingLoading}
								>
									Save Notification
								</Button>
							</Stack>
						</Stack>
						{createNotifMarketingError && (
							<Alert severity="error" sx={{ mb: 1 }}>
								{createNotifMarketingError.data.message}
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
										<Grid item xs={12}>
											<InputTitle>Notification Target</InputTitle>
											<Grid container spacing={{ xs: 1, sm: 2 }} rowSpacing={2}>
												<Grid
													item
													{...(values.sendTo === "selected" ? { xs: 7, lg: 8, xl: 9 } : { xs: 12 })}
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
													minDateTime={DateTime.now()}
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
									</Grid>
								</Grid>
								<Grid item xs={12} md={6} spacing={3}>
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
								</Grid>
							</Grid>
						</FormContainer>
					</>
				)}
			</Formik>
		</AddNotificationContainer>
	);
};

export default AddNotification;
