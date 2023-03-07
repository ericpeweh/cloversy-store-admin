// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";

// Styles
import { AddVoucherContainer, FormContainer, InputTitle, UserContainer } from "./AddVoucher.styles";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";

// Hooks
import { useGetCustomersQuery } from "../../api/customer.api";
import { useCreateVoucherMutation } from "../../api/voucher.api";
import { useRouter } from "next/router";
import useModal from "../../hooks/useModal";
import useDebounce from "../../hooks/useDebounce";

// Utils
import generateVoucherCode from "../../utils/generateVoucherCode";

// Types
import { Customer, CreateVoucherBody } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Components
import { Alert, Chip, Grid, ListItem, Stack, Typography } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import DatePicker from "../../components/DatePicker/DatePicker";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";

interface AddVoucherFormValues {
	title: string;
	status: "active" | "disabled";
	usage_limit: number;
	code: string;
	description: string;
	expiry_date: DateTimeType;
	voucher_scope: string;
	selectedUsers: { id: number; email: string }[];
	discount_type: string;
	discount: number;
}

const CreateVoucherSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	status: Yup.string().required("Required"),
	usage_limit: Yup.number(),
	code: Yup.string().length(10).required("Required"),
	discount: Yup.number().required("Required"),
	discount_type: Yup.string().required("Required"),
	voucher_scope: Yup.string().required("Required")
});

const formInitialValues: AddVoucherFormValues = {
	title: "",
	status: "active",
	usage_limit: 10,
	code: "",
	description: "",
	expiry_date: DateTime.now(),
	voucher_scope: "global",
	selectedUsers: [],
	discount_type: "value",
	discount: 0
};

const AddVoucher = () => {
	const router = useRouter();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
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

	const [
		createVoucher,
		{
			data: createVoucherData,
			isLoading: isCreateVoucherLoading,
			error: voucherError,
			isSuccess: isCreateVoucherSuccess,
			reset: resetCreateVoucher
		}
	] = useCreateVoucherMutation();
	const createVoucherError: any = voucherError;
	const newVoucherId = createVoucherData?.data.newVoucher.code;

	const createVoucherHandler = (data: Partial<CreateVoucherBody>) => createVoucher(data);

	useEffect(() => {
		if (isCreateVoucherSuccess) {
			resetCreateVoucher();
			router.push(`/vouchers/${newVoucherId}`);
		}
	}, [isCreateVoucherSuccess, resetCreateVoucher, router, newVoucherId]);

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
		<AddVoucherContainer>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateVoucherSchema}
				onSubmit={({ selectedUsers, expiry_date, ...values }) => {
					createVoucherHandler({
						...values,
						selectedUserIds:
							values.voucher_scope === "user" ? selectedUsers.map(user => user.id) : [],
						expiry_date: expiry_date.toISO().slice(0, 23)
					});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<>
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
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ mb: 4 }}
						>
							<PageTitle sx={{ mb: 0 }}>Add Voucher</PageTitle>
							<Stack direction="row" alignItems="center" gap={1}>
								<Button
									size="small"
									color="secondary"
									variant="outlined"
									onClick={() => router.push("/vouchers")}
								>
									Cancel
								</Button>
								<Button
									startIcon={<DoneIcon />}
									size="small"
									color="primary"
									onClick={() => handleSubmit()}
									loading={isCreateVoucherLoading}
								>
									Save Voucher
								</Button>
							</Stack>
						</Stack>
						{createVoucherError && (
							<Alert severity="error" sx={{ mt: 2 }}>
								{createVoucherError?.data?.message || "Error occured while creating new voucher."}
							</Alert>
						)}
						<FormContainer onSubmit={handleSubmit}>
							<Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
								<Grid item xs={12} md={6}>
									<Grid container spacing={{ xs: 2, md: 3 }} sx={{ ml: { xs: -2 } }}>
										<Grid item xs={12}>
											<TextInput
												name="title"
												label="Voucher title"
												value={values.title}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.title && touched.title)}
											/>
											{errors.title && touched.title && <ErrorMessage>{errors.title}</ErrorMessage>}
										</Grid>
										<Grid item xs={12}>
											<SelectInput
												name="status"
												options={[
													{ label: "Active", value: "active" },
													{ label: "Disabled", value: "disabled" }
												]}
												value={values.status}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.status && touched.status)}
											/>
											{errors.status && touched.status && (
												<ErrorMessage>{errors.status}</ErrorMessage>
											)}
										</Grid>
										<Grid item xs={12}>
											<Stack direction="row" gap={{ xs: 1, sm: 2, md: 3 }}>
												<TextInput
													name="code"
													label="Voucher Code"
													value={values.code}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.code && touched.code)}
												/>
												<BoxButton
													onClick={() => {
														setFieldValue("code", generateVoucherCode());
													}}
												>
													<CasinoOutlinedIcon />
												</BoxButton>
											</Stack>
											{errors.code && touched.code && <ErrorMessage>{errors.code}</ErrorMessage>}
										</Grid>
										<Grid item xs={12}>
											<TextInput
												label="Description"
												name="description"
												multiline
												rows={10}
												value={values.description}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} md={6}>
									<Grid container spacing={{ xs: 2, md: 3 }} sx={{ ml: { xs: -2 } }}>
										<Grid item xs={12}>
											<TextInput
												name="usage_limit"
												label="Usage limit"
												value={values.usage_limit}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.usage_limit && touched.usage_limit)}
												type="number"
											/>
											{errors.usage_limit && touched.usage_limit && (
												<ErrorMessage>{errors.usage_limit}</ErrorMessage>
											)}
										</Grid>
										<Grid item xs={12}>
											<DatePicker
												label="Expiry Date"
												value={values.expiry_date}
												onChange={(value: Date) => setFieldValue("expiry_date", value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<InputTitle>Discount Scope</InputTitle>
											<Grid container xs={12} spacing={{ xs: 1, sm: 2, md: 3 }}>
												<Grid
													item
													xs={values.voucher_scope === "user" ? 7 : 12}
													sm={values.voucher_scope === "user" ? 9 : 12}
												>
													<SelectInput
														options={[
															{ label: "Global", value: "global" },
															{ label: "User", value: "user" }
														]}
														name="voucher_scope"
														value={values.voucher_scope}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.voucher_scope && touched.voucher_scope)}
													/>
												</Grid>
												{values.voucher_scope === "user" && (
													<Grid item xs={5} sm={3}>
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
												{values.voucher_scope === "user" && (
													<Grid item xs={12}>
														{values.selectedUsers.length === 0 && (
															<FallbackContainer size="small">
																<Typography>No customers selected</Typography>
															</FallbackContainer>
														)}
														<UserContainer>
															{values.selectedUsers.map(data => {
																return (
																	<ListItem key={data.id}>
																		<Chip
																			label={data.email}
																			onDelete={() => {
																				const updatedSelectedData = values.selectedUsers.filter(
																					user => user.id !== data.id
																				);
																				setFieldValue("selectedUsers", updatedSelectedData);
																			}}
																		/>
																	</ListItem>
																);
															})}
														</UserContainer>
													</Grid>
												)}
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<InputTitle>Discount Type</InputTitle>
											<Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 2, md: 3 }}>
												<SelectInput
													options={[
														{ label: "Value", value: "value" },
														{ label: "Percentage", value: "percentage" }
													]}
													name="discount_type"
													value={values.discount_type}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.discount_type && touched.discount_type)}
												/>
												<TextInput
													type="number"
													name="discount"
													label="Discount value / percentage"
													value={values.discount}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.discount && touched.discount)}
												/>
											</Stack>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</FormContainer>
					</>
				)}
			</Formik>
		</AddVoucherContainer>
	);
};

export default AddVoucher;
