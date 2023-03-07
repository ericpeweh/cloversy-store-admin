// Dependencies
import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { DateTime } from "luxon";
import * as Yup from "yup";
import Head from "next/head";

// Styles
import {
	EditEmailMarketingContainer,
	FormContainer,
	InputTitle
} from "./EditEmailMarketing.styles";

// Types
import { UpdateEmailMarketingData, Customer, EmailTemplate } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

// Hooks
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";
import {
	useUpdateEmailMarketingMutation,
	useGetEmailMarketingDetailQuery,
	useGetEmailTemplatesQuery
} from "../../api/marketing.api";
import { useGetCustomersQuery } from "../../api/customer.api";
import { useRouter } from "next/router";
import useSelector from "../../hooks/useSelector";

// Components
import { Alert, CircularProgress, Grid, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import PerformantTextInput from "../../components/PerformantTextInput/PerformantTextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";
import BoxButton from "../../components/BoxButton/BoxButton";
import ResultPreview from "../../components/ResultPreview/ResultPreview";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

interface UpdateEmailMarketingFormValues {
	title: string;
	description: string;
	scheduled: DateTimeType;
	email_subject: string;
	sendTo: "selected";
	templateId: number;
	selectedUsers: { id: number; email: string }[];
	removeSelectedUsers: { id: number; email: string }[];
}

const UpdateEmailMarketingSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string(),
	email_subject: Yup.string().required("Required"),
	templateId: Yup.number().not([-1], "Please select a email template").required("Required"),
	sendTo: Yup.string().oneOf(["selected"], "Invalid value"),
	selectedUsers: Yup.array(),
	removeSelectedUsers: Yup.array()
});

const EditEmailMarketing = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { emailMarketingId } = router.query;
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [scheduledEmail, setScheduledEmail] = useState<boolean>(false);
	const [originalSelectedUsers, setOriginalSelectedUsers] = useState<Partial<Customer>[]>([]);
	const [formInitialValues, setFormInitialValues] = useState<UpdateEmailMarketingFormValues>({
		title: "",
		description: "",
		scheduled: DateTime.now(),
		selectedUsers: [],
		removeSelectedUsers: [],
		email_subject: "",
		sendTo: "selected",
		templateId: -1
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
	const isNotificiationSent = emailMarketingData?.sent_at;

	// Set form initial values
	// Save original selectedUsers data to state
	useEffect(() => {
		if (isGetEmailMarketingSuccess && emailMarketingData) {
			setFormInitialValues({
				title: emailMarketingData.title,
				description: emailMarketingData.description ?? "",
				scheduled: emailMarketingData?.scheduled
					? DateTime.fromISO(emailMarketingData?.scheduled)
					: DateTime.now(),
				selectedUsers:
					emailMarketingData.selectedUsers?.length > 0
						? emailMarketingData.selectedUsers.map(user => ({
								id: user.user_id!,
								email: user.email || ""
						  }))
						: [],
				removeSelectedUsers: [],
				email_subject: emailMarketingData.email_subject,
				templateId: emailMarketingData.template_id,
				sendTo: emailMarketingData.send_to,
				...emailMarketingData.params
			});

			if (emailMarketingData?.selectedUsers) {
				setOriginalSelectedUsers(emailMarketingData.selectedUsers);
			}

			if (emailMarketingData?.scheduled) {
				setScheduledEmail(true);
			}
		}
	}, [emailMarketingData, isGetEmailMarketingSuccess]);

	// Fetch email templates
	const {
		data: emailTemplatesData,
		isFetching: isGetEmailTemplatesLoading,
		isSuccess: isGetEmailTemplatesSuccess,
		error: getEmailTemplatesErrorData,
		refetch: refetchEmailTemplates
	} = useGetEmailTemplatesQuery(isAuth, {
		skip: !isAuth
	});
	const getEmailTemplatesError: any = getEmailTemplatesErrorData;

	const emailTemplatesOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			emailTemplatesData?.data.emailsTemplate?.map((template: EmailTemplate) => ({
				label: template.name,
				value: template.id
			})) || [];

		return [{ label: "- Select email template * -", value: -1 }, ...availableOptions];
	}, [emailTemplatesData?.data.emailsTemplate]);

	// Fetch customer data
	const {
		data: customersData,
		isFetching: isGetCustomersFetching,
		isLoading: isGetCustomersLoading,
		isSuccess: isGetCustomersSuccess,
		error: getCustomersError
	} = useGetCustomersQuery(
		{ q: searchQuery, page, statusFilter: "active" },
		{
			skip: !isSelectCustomerModalOpen
		}
	);
	const customersError: any = getCustomersError;

	// Update email marketing API
	const [
		updateEmailMarketing,
		{
			data: updateEmailMarketingData,
			isLoading: isUpdateEmailMarketingLoading,
			error: updateEmailMarketingErrorData,
			isSuccess: isUpdateEmailMarketingSuccess,
			reset: resetUpdateEmailMarketing
		}
	] = useUpdateEmailMarketingMutation();
	const updateEmailMarketingError: any = updateEmailMarketingErrorData;
	const updatedEmailMarketingId = updateEmailMarketingData?.data.updatedEmailMarketing.id;

	const updateEmailMarketingHandler = (data: UpdateEmailMarketingData) => {
		updateEmailMarketing(data);
	};

	useEffect(() => {
		if (isUpdateEmailMarketingSuccess) {
			resetUpdateEmailMarketing();
			router.replace(`/marketing/email/${updatedEmailMarketingId}`);
		}
	}, [isUpdateEmailMarketingSuccess, resetUpdateEmailMarketing, router, updatedEmailMarketingId]);

	// Handle push subscriptions target list pagination
	useEffect(() => {
		setCustomers([]);
		setCurrentPage(0);
		setPage(1);
	}, [searchQuery]);

	useEffect(() => {
		if (customersData && isGetCustomersSuccess && !isGetCustomersFetching) {
			if (currentPage < customersData.page) {
				setCustomers(prev => [...prev, ...customersData.data.customers]);
				setCurrentPage(customersData.page);
			}
		}
	}, [customersData, currentPage, isGetCustomersSuccess, isGetCustomersFetching]);

	const loadMoreHandler = () => {
		setPage(prev => prev + 1);
	};

	const selectUserModalHandler = (
		isSelected: boolean,
		selectedUser: { id: number; email: string },
		values: UpdateEmailMarketingFormValues,
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
					Edit Email Marketing | {emailMarketingData?.notification_code || "Loading..."}
				</title>
			</Head>
			<EditEmailMarketingContainer>
				<Formik
					initialValues={formInitialValues}
					validationSchema={UpdateEmailMarketingSchema}
					onSubmit={(
						{ removeSelectedUsers, selectedUsers, scheduled, ...values },
						{ setFieldError }
					) => {
						if (scheduledEmail && !scheduled.isValid) {
							setFieldError("scheduled", "Invalid date");
							return;
						}

						if (emailMarketingData) {
							let formParams: { [key: string]: string } = {};
							if (isGetEmailTemplatesSuccess && emailTemplatesData && values.templateId !== -1) {
								const params =
									emailTemplatesData?.data.emailsTemplate.find(
										template => template.id === values.templateId
									)?.params || [];

								params.forEach(param => {
									// Assign to params
									formParams[param] = values[param as keyof typeof values] as string;

									// Delete params from values
									delete values[param as keyof typeof values];
								});
							}

							updateEmailMarketingHandler({
								emailMarketingId: emailMarketingData.id,
								...values,
								params: formParams,
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
								scheduled: scheduledEmail ? scheduled.toISO().slice(0, 23) : null
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
										data={customers}
										page={currentPage}
										totalPages={customersData?.totalPages || 0}
										searchQuery={searchInput}
										onSearchQueryChange={searchQueryChangeHandler}
										onLoadMore={loadMoreHandler}
										onSelect={(isSelected: boolean, selectedUser: { id: number; email: string }) =>
											selectUserModalHandler(isSelected, selectedUser, values, setFieldValue)
										}
										manualOnSelect={true}
										selectedData={values.selectedUsers}
										isLoading={isGetCustomersLoading}
										isFetching={isGetCustomersFetching}
										error={customersError}
									/>
									{/* View selected customer */}
									<UserPickerModal
										open={isViewSelectCustomerModalOpen}
										onClose={viewSelectCustomerModalCloseHandler}
										data={customers.filter(
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
								<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Edit Email</PageTitle>
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
										loading={isUpdateEmailMarketingLoading}
									>
										Update Email Marketing
									</Button>
								</Stack>
							</Stack>
							{!isGetEmailMarketingLoading && getEmailMarketingError && (
								<FallbackContainer>
									<Alert severity="error">
										{emailMarketingError?.data?.message ||
											"Error occured while fetching email marketings data"}
									</Alert>
									<BoxButton onClick={refetchEmailMarketing}>Try again</BoxButton>
								</FallbackContainer>
							)}
							{isGetEmailMarketingLoading && (
								<FallbackContainer>
									<CircularProgress />
								</FallbackContainer>
							)}
							{updateEmailMarketingError && (
								<Alert severity="error" sx={{ mb: 1 }}>
									{updateEmailMarketingError?.data?.message}
								</Alert>
							)}
							<FormContainer>
								<Grid container spacing={{ xs: 1, sm: 3, lg: 4 }} alignItems="flex-start">
									<Grid item xs={12} md={6}>
										<Grid container spacing={{ xs: 2, md: 3 }}>
											<Grid item xs={12}>
												<InputTitle>Email Detail</InputTitle>
												<PerformantTextInput
													name="title"
													label="Email title"
													value={values.title}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.title && touched.title)}
												/>
											</Grid>
											<Grid item xs={12}>
												<PerformantTextInput
													label="Email description"
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
														<InputTitle>Email Target</InputTitle>
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
															checked={scheduledEmail}
															onChange={setScheduledEmail}
														/>
													</Grid>
													{scheduledEmail && (
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
														Only some fields can be edited because email marketing is already sent.
													</Alert>
												</Grid>
											)}
										</Grid>
									</Grid>
									<Grid item xs={12} md={6}>
										{!isNotificiationSent && (
											<Grid container spacing={{ xs: 2, md: 3 }}>
												<Grid item xs={12}>
													<InputTitle>Email Info</InputTitle>
													<PerformantTextInput
														name="email_subject"
														label="Email subject *"
														value={values.email_subject}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.email_subject && touched.email_subject)}
													/>
												</Grid>
												<Grid item xs={12}>
													<Stack direction="row" gap={{ xs: 1, sm: 2 }}>
														<SelectInput
															options={
																isGetEmailTemplatesLoading
																	? [{ label: "Loading...", value: values.templateId }]
																	: emailTemplatesOptions
															}
															name="templateId"
															value={values.templateId}
															onChange={handleChange}
															onBlur={handleBlur}
															error={Boolean(errors.sendTo && touched.sendTo)}
														/>
														<BoxButton onClick={refetchEmailTemplates}>
															<RefreshIcon />
														</BoxButton>
													</Stack>
													{getEmailTemplatesError && (
														<Alert severity="error" sx={{ mt: 2 }}>
															{getEmailTemplatesError?.data?.message}
														</Alert>
													)}
													{errors.templateId && touched.templateId && (
														<Alert severity="error" sx={{ mt: 2 }}>
															{errors.templateId}
														</Alert>
													)}
												</Grid>
												{(
													(isGetEmailTemplatesSuccess &&
														emailTemplatesData &&
														emailTemplatesData?.data.emailsTemplate.find(
															template => template.id === values.templateId
														)?.params) ||
													[]
												)
													.filter(param => param !== "full_name")
													.map(field => (
														<Grid item xs={12} key={field}>
															<PerformantTextInput
																name={field}
																label={field}
																value={values[field as keyof typeof values] as string}
																onChange={handleChange}
																onBlur={handleBlur}
																error={Boolean(
																	errors[field as keyof typeof values] &&
																		touched[field as keyof typeof values]
																)}
															/>
														</Grid>
													))}
											</Grid>
										)}
									</Grid>
								</Grid>
								{isGetEmailTemplatesSuccess && emailTemplatesData && values.templateId !== -1 && (
									<ResultPreview
										emailsTemplate={emailTemplatesData.data.emailsTemplate}
										templateId={values.templateId}
										values={values}
									/>
								)}
							</FormContainer>
						</>
					)}
				</Formik>
			</EditEmailMarketingContainer>
		</>
	);
};

export default EditEmailMarketing;
