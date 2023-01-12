// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import Head from "next/head";

// Styles
import {
	EditVoucherContainer,
	FormContainer,
	InputTitle,
	UserContainer
} from "./EditVoucher.styles";

// Types
import { Customer, UpdateVoucherBody } from "../../interfaces";

// Hooks
import useModal from "../../hooks/useModal";
import useSelector from "../../hooks/useSelector";
import useDebounce from "../../hooks/useDebounce";
import { useRouter } from "next/router";
import { useGetCustomersQuery } from "../../api/customer.api";
import { useGetVoucherDetailQuery, useUpdateVoucherMutation } from "../../api/voucher.api";

// Icons
import DoneIcon from "@mui/icons-material/Done";

// Types
import type { DateTime as DateTimeType } from "luxon";

// Components
import { Alert, Chip, CircularProgress, Grid, ListItem, Stack, Typography } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import DatePicker from "../../components/DatePicker/DatePicker";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import UserPickerModal from "../../components/UserPickerModal/UserPickerModal";

interface UpdateVoucherFormValues {
	title: string;
	status: "active" | "disabled";
	description: string;
	expiry_date: DateTimeType;
	voucher_scope: string;
	selectedUsers: { id: number; email: string }[];
	removeSelectedUsers: { id: number; email: string }[];
	discount_type: string;
	discount: number;
}

const UpdateVoucherSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	status: Yup.string().required("Required"),
	discount: Yup.number().required("Required"),
	discount_type: Yup.string().required("Required"),
	voucher_scope: Yup.string().required("Required")
});

const EditVoucher = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { voucherCode } = router.query;
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [page, setPage] = useState(1);
	const [originalSelectedUsers, setOriginalSelectedUsers] = useState<Partial<Customer>[]>([]);
	const [formInitialValues, setFormInitialValues] = useState<UpdateVoucherFormValues>({
		title: "",
		status: "active",
		description: "",
		expiry_date: DateTime.now(),
		voucher_scope: "global",
		selectedUsers: [],
		removeSelectedUsers: [],
		discount_type: "value",
		discount: 0
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

	const {
		data: getVoucherData,
		isLoading: isGetVoucherLoading,
		isSuccess: isGetVoucherSuccess,
		error: getVoucherErrorData,
		refetch: refetchVoucher
	} = useGetVoucherDetailQuery(voucherCode, {
		skip: !isAuth || !voucherCode
	});
	const getVoucherError: any = getVoucherErrorData;
	const voucherData = getVoucherData?.data.voucher;

	// Set form initial values
	// Save original selectedUsers data to state
	useEffect(() => {
		if (isGetVoucherSuccess && voucherData) {
			setFormInitialValues({
				title: voucherData.title ?? "",
				status: voucherData.status ?? "",
				description: voucherData.description ?? "",
				expiry_date: voucherData?.expiry_date
					? DateTime.fromISO(voucherData.expiry_date)
					: DateTime.now(),
				voucher_scope: voucherData.voucher_scope ?? "global",
				selectedUsers:
					voucherData.selectedUsers?.length > 0
						? voucherData.selectedUsers.map((user: Partial<Customer>) => ({
								id: user.user_id!,
								email: user.email || ""
						  }))
						: [],
				removeSelectedUsers: [],
				discount_type: voucherData.discount_type ?? "value",
				discount: voucherData.discount ?? 0
			});

			if (voucherData?.selectedUsers) {
				setOriginalSelectedUsers(voucherData.selectedUsers);
			}
		}
	}, [voucherData, isGetVoucherSuccess]);

	const [
		updateVoucher,
		{
			data: updateVoucherData,
			isLoading: isUpdateVoucherLoading,
			error: updateVoucherErrorData,
			isSuccess: isUpdateVoucherSuccess,
			reset: resetUpdateVoucher
		}
	] = useUpdateVoucherMutation();
	const updateVoucherError: any = updateVoucherErrorData;
	const updatedVoucherCode = updateVoucherData?.data.updatedVoucher.code;

	const updateVoucherHandler = (data: Partial<UpdateVoucherBody>) => updateVoucher(data);

	useEffect(() => {
		if (isUpdateVoucherSuccess) {
			resetUpdateVoucher();
			router.push(`/vouchers/${updatedVoucherCode}`);
		}
	}, [isUpdateVoucherSuccess, resetUpdateVoucher, router, updatedVoucherCode]);

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
		values: UpdateVoucherFormValues,
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
				<title>Edit Voucher | {voucherCode || "Loading..."}</title>
			</Head>
			<EditVoucherContainer>
				<Formik
					initialValues={formInitialValues}
					validationSchema={UpdateVoucherSchema}
					enableReinitialize={true}
					onSubmit={({ removeSelectedUsers, selectedUsers, expiry_date, ...values }) => {
						updateVoucherHandler({
							code: voucherData?.code,
							...values,
							selectedUserIds:
								values.voucher_scope === "user"
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
								onSelect={(isSelected: boolean, selectedUser: { id: number; email: string }) =>
									selectUserModalHandler(isSelected, selectedUser, values, setFieldValue)
								}
								manualOnSelect={true}
								selectedData={values.selectedUsers}
								isLoading={isGetCustomersLoading}
								isFetching={isGetCustomersFetching}
								error={customersError}
							/>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<PageTitle sx={{ mb: 0 }}>Edit Voucher</PageTitle>
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
										loading={isUpdateVoucherLoading}
									>
										Update Voucher
									</Button>
								</Stack>
							</Stack>
							{!isGetVoucherLoading && getVoucherError && (
								<FallbackContainer>
									<Alert severity="error">{getVoucherError.data.message}</Alert>
									<BoxButton onClick={refetchVoucher}>Try again</BoxButton>
								</FallbackContainer>
							)}
							{isGetVoucherLoading && (
								<FallbackContainer>
									<CircularProgress />
								</FallbackContainer>
							)}
							{updateVoucherError && (
								<Alert severity="error">{updateVoucherError.data.message}</Alert>
							)}
							{isGetVoucherSuccess && getVoucherData && (
								<FormContainer>
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
													{errors.title && touched.title && (
														<ErrorMessage>{errors.title}</ErrorMessage>
													)}
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
													<DatePicker
														label="Expiry Date"
														value={values.expiry_date}
														onChange={(value: Date) => setFieldValue("expiry_date", value)}
													/>
												</Grid>
												<Grid item xs={12}>
													<InputTitle>Discount Scope</InputTitle>
													<Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
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
																						const existInOriginal =
																							originalSelectedUsers.findIndex(
																								user => user.user_id === data.id
																							) !== -1;

																						const updatedSelectedData = values.selectedUsers.filter(
																							user => user.id !== data.id
																						);
																						setFieldValue("selectedUsers", updatedSelectedData);

																						if (existInOriginal) {
																							setFieldValue("removeSelectedUsers", [
																								...values.removeSelectedUsers,
																								data
																							]);
																						}
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
							)}
						</>
					)}
				</Formik>
			</EditVoucherContainer>
		</>
	);
};

export default EditVoucher;
