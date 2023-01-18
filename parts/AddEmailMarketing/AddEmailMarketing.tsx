// Dependencies
import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { DateTime } from "luxon";
import * as Yup from "yup";

// Styles
import { AddEmailMarketingContainer, FormContainer, InputTitle } from "./AddEmailMarketing.styles";

// Types
import { CreateEmailMarketingData, Customer, EmailTemplate } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

// Hooks
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";
import { useGetCustomersQuery } from "../../api/customer.api";
import {
	useCreateEmailMarketingMutation,
	useGetEmailTemplatesQuery
} from "../../api/marketing.api";
import { useRouter } from "next/router";
import useSelector from "../../hooks/useSelector";

// Components
import { Alert, Grid, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import PerformantTextInput from "../../components/PerformantTextInput/PerformantTextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";
import BoxButton from "../../components/BoxButton/BoxButton";

interface AddEmailMarketingFormValues {
	title: string;
	scheduled: DateTimeType;
	description: string;
	email_subject: string;
	sendTo: "selected";
	selectedUsers: { id: number; email: string }[];
	templateId: number;
}

const CreateNotifMarketingSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string(),
	email_subject: Yup.string().required("Required"),
	templateId: Yup.number().not([-1], "Please select a email template").required("Required"),
	sendTo: Yup.string().oneOf(["selected"], "Invalid value"),
	selectedUsers: Yup.array().min(1, "Please select an user")
});

const formInitialValues: AddEmailMarketingFormValues = {
	title: "",
	description: "",
	scheduled: DateTime.now(),
	selectedUsers: [],
	email_subject: "",
	sendTo: "selected",
	templateId: -1
};

const AddEmailMarketing = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [scheduledEmailMarketing, setScheduledEmailMarketing] = useState<boolean>(false);
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

	// Create notif marketing API
	const [
		createEmailMarketing,
		{
			data: createEmailMarketingData,
			isLoading: isCreateEmailMarketingLoading,
			error: emailMarketingError,
			isSuccess: isCreateEmailMarketingSuccess,
			reset: resetCreateEmailMarketing
		}
	] = useCreateEmailMarketingMutation();
	const createEmailMarketingError: any = emailMarketingError;
	const newEmailMarketingId = createEmailMarketingData?.data.newEmailMarketing.id;

	const createEmailMarketingHandler = (data: CreateEmailMarketingData) =>
		createEmailMarketing(data);

	useEffect(() => {
		if (isCreateEmailMarketingSuccess) {
			resetCreateEmailMarketing();
			router.push(`/marketing/email/${newEmailMarketingId}`);
		}
	}, [isCreateEmailMarketingSuccess, resetCreateEmailMarketing, router, newEmailMarketingId]);

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

	return (
		<AddEmailMarketingContainer>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateNotifMarketingSchema}
				onSubmit={({ selectedUsers, scheduled, ...values }, { setFieldError }) => {
					if (scheduledEmailMarketing && !scheduled.isValid) {
						setFieldError("scheduled", "Invalid date");
						return;
					}

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

					createEmailMarketingHandler({
						...values,
						params: formParams,
						selectedUserIds: values.sendTo === "selected" ? selectedUsers.map(user => user.id) : [],
						scheduled: scheduledEmailMarketing ? scheduled.toISO().slice(0, 23) : null
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
							data={customers}
							page={currentPage}
							totalPages={customersData?.totalPages || 0}
							searchQuery={searchInput}
							onSearchQueryChange={searchQueryChangeHandler}
							onLoadMore={loadMoreHandler}
							onSelect={setFieldValue}
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
							<PageTitle sx={{ mb: { xs: 1, sm: 0 } }}>Add Email Marketing</PageTitle>
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
									loading={isCreateEmailMarketingLoading}
								>
									Save Email Marketing
								</Button>
							</Stack>
						</Stack>
						{createEmailMarketingError && (
							<Alert severity="error" sx={{ my: 1 }}>
								{createEmailMarketingError?.data?.message || "An error occured!"}
							</Alert>
						)}
						<FormContainer>
							<Grid container spacing={{ xs: 1, sm: 3, lg: 4 }} alignItems="flex-start">
								<Grid item xs={12} md={6}>
									<Grid container spacing={{ xs: 2, md: 3 }}>
										<Grid item xs={12}>
											<InputTitle>Email Marketing Detail</InputTitle>
											<PerformantTextInput
												name="title"
												label="Email marketing title *"
												value={values.title}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.title && touched.title)}
											/>
										</Grid>
										<Grid item xs={12}>
											<PerformantTextInput
												label="Email marketing description"
												name="description"
												multiline
												rows={4}
												value={values.description}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Grid>
										<Grid item xs={12}>
											<InputTitle>Email Target</InputTitle>
											<Grid container spacing={{ xs: 1, sm: 2 }} rowSpacing={2}>
												<Grid
													item
													{...(values.sendTo === "selected" ? { xs: 7, lg: 8, xl: 9 } : { xs: 12 })}
												>
													<SelectInput
														options={[{ label: "Selected customers", value: "selected" }]}
														name="sendTo"
														value={values.sendTo}
														label="Select target *"
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
											{errors.selectedUsers && touched.selectedUsers && (
												<Alert severity="error" sx={{ mt: 2 }}>
													{errors?.selectedUsers + ""}
												</Alert>
											)}
										</Grid>
										<Grid item xs={12}>
											<Checkbox
												label="Schedule email marketing"
												checked={scheduledEmailMarketing}
												onChange={setScheduledEmailMarketing}
											/>
										</Grid>
										{scheduledEmailMarketing && (
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
								</Grid>
							</Grid>
						</FormContainer>
					</>
				)}
			</Formik>
		</AddEmailMarketingContainer>
	);
};

export default AddEmailMarketing;
