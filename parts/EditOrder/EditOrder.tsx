// Dependencies
import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";

// Styles
import {
	EditOrderContainer,
	FormContainer,
	InputTitle,
	TimelineAction,
	TimelineItem,
	TimelineText
} from "./EditOrder.styles";

// Hooks
import {
	useGetTransactionDetailsToEditQuery,
	useUpdateTransactionMutation
} from "../../api/transaction.api";
import useSelector from "../../hooks/useSelector";
import { useRouter } from "next/router";

// Utils
import { formatDateTimeline } from "../../utils/formatDate";

// Types
import {
	SetFieldValue,
	TransactionTimelineItem,
	UpdateTransactionFormValues
} from "../../interfaces";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

// Components
import { Alert, CircularProgress, Grid, IconButton, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import PerformantTextInput from "../../components/PerformantTextInput/PerformantTextInput";

const _sortByDateDesc = (a: TransactionTimelineItem, b: TransactionTimelineItem) =>
	a.timeline_date > b.timeline_date ? -1 : a.timeline_date < b.timeline_date ? 1 : 0;

const _sortByDateAsc = (a: TransactionTimelineItem, b: TransactionTimelineItem) =>
	a.timeline_date < b.timeline_date ? -1 : a.timeline_date > b.timeline_date ? 1 : 0;

const UpdateTransactionSchema = Yup.object().shape({
	orderNote: Yup.string(),
	customerNote: Yup.string(),
	giftNote: Yup.string(),
	shippingTrackingCode: Yup.string(),
	timeline: Yup.array()
});

const EditOrder = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { orderId } = router.query;
	const [timelineDescInput, setTimelineDescInput] = useState("");
	const [timelineDateInput, setTimelineDateInput] = useState(DateTime.now());
	const {
		data: resultData,
		isLoading: isGetOrderLoading,
		isSuccess: isGetOrderSuccess,
		error: getOrderErrorData,
		refetch: refetchOrder
	} = useGetTransactionDetailsToEditQuery(orderId as string, { skip: !isAuth });
	const getOrderError: any = getOrderErrorData;
	const orderData = resultData?.data.transaction;

	const [formInitialValues, setFormInitialValues] = useState<UpdateTransactionFormValues>({
		orderNote: "",
		customerNote: "",
		giftNote: "",
		shippingTrackingCode: "",
		timeline: []
	});

	// Fill form initial values
	useEffect(() => {
		if (orderData && isGetOrderSuccess) {
			setFormInitialValues({
				orderNote: orderData.order_note ?? "",
				customerNote: orderData.customer_note ?? "",
				giftNote: orderData.gift_note ?? "",
				shippingTrackingCode: orderData.shipping_details.shipping_tracking_code ?? "",
				timeline: orderData.timeline ?? []
			});
		}
	}, [orderData, isGetOrderSuccess]);

	const [
		updateTransaction,
		{ isLoading: isUpdateTransactionLoading, error: updateTransactionErrorData }
	] = useUpdateTransactionMutation();
	const updateTransactionError: any = updateTransactionErrorData;

	const updateTransactionHandler = async ({ timeline, ...data }: UpdateTransactionFormValues) => {
		if (orderId) {
			const sortedTimeline = [...timeline].sort(_sortByDateAsc);
			const updatedTransactionData = {
				transactionId: orderId.toString(),
				timelineObj: JSON.stringify(sortedTimeline),
				...data
			};

			const result = await updateTransaction(updatedTransactionData).unwrap();

			if (result.status === "success") {
				router.push(`/orders/${result.data.updatedTransaction.id}`);
			}
		}
	};

	const addTimelineItemHandler = (
		setFieldValue: SetFieldValue,
		values: UpdateTransactionFormValues
	) => {
		if (!timelineDescInput || !timelineDateInput.isValid) return;

		const updatedTimeline = [
			...values.timeline,
			{
				description: timelineDescInput,
				timeline_date: timelineDateInput.toISO()
			}
		] // Sort by date (DESCENDING)
			.sort(_sortByDateDesc);

		setFieldValue("timeline", updatedTimeline);
		setTimelineDescInput("");
	};

	const removeTimelineItemHandler = (
		setFieldValue: SetFieldValue,
		values: UpdateTransactionFormValues,
		timelineIndex: number
	) => {
		const updatedTimeline = [
			...values.timeline.slice(0, timelineIndex),
			...values.timeline.slice(timelineIndex + 1)
		];
		setFieldValue("timeline", updatedTimeline);
	};

	return (
		<EditOrderContainer>
			<Formik
				initialValues={formInitialValues}
				validationSchema={UpdateTransactionSchema}
				enableReinitialize={true}
				onSubmit={values => updateTransactionHandler(values)}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<PageTitle>Edit Order</PageTitle>
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
									loading={isUpdateTransactionLoading}
									onClick={() => handleSubmit()}
								>
									Update Order
								</Button>
							</Stack>
						</Stack>
						{!isGetOrderLoading && getOrderError && (
							<FallbackContainer>
								<Alert severity="error">
									{getOrderError?.data?.message ||
										"Error occured while fetching order details data."}
								</Alert>
								<BoxButton onClick={refetchOrder}>Try again</BoxButton>
							</FallbackContainer>
						)}
						{isGetOrderLoading && (
							<FallbackContainer>
								<CircularProgress />
							</FallbackContainer>
						)}
						{updateTransactionError && (
							<Alert severity="error" sx={{ mt: 2 }}>
								{updateTransactionError?.data?.message ||
									"Error occured while updating transaction."}
							</Alert>
						)}
						{isGetOrderSuccess && orderData && (
							<FormContainer>
								<Grid container spacing={{ xs: 2, lg: 3 }} alignItems="flex-start">
									<Grid item xs={12} md={6}>
										<Grid container spacing={{ xs: 2, md: 3 }}>
											<Grid item xs={12}>
												<InputTitle>Notes</InputTitle>
												<PerformantTextInput
													name="orderNote"
													label="Order note"
													multiline
													rows={5}
													value={values.orderNote}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.orderNote && touched.orderNote)}
												/>
											</Grid>
											<Grid item xs={12}>
												<PerformantTextInput
													name="customerNote"
													label="Customer note"
													multiline
													rows={5}
													value={values.customerNote}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.customerNote && touched.customerNote)}
												/>
											</Grid>
											<Grid item xs={12}>
												<PerformantTextInput
													name="giftNote"
													label="Gift note"
													multiline
													rows={5}
													value={values.giftNote}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(errors.giftNote && touched.giftNote)}
												/>
											</Grid>
											<Grid item xs={12}>
												<InputTitle>
													Shipping ({orderData.shipping_details.shipping_courier.toUpperCase()})
												</InputTitle>
												<PerformantTextInput
													name="shippingTrackingCode"
													label="Shipping Tracking Code"
													value={values.shippingTrackingCode}
													onChange={handleChange}
													onBlur={handleBlur}
													error={Boolean(
														errors.shippingTrackingCode && touched.shippingTrackingCode
													)}
												/>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12} md={6}>
										<Grid container spacing={{ xs: 2, md: 3 }}>
											<Grid item xs={12}>
												<InputTitle>Order Timeline</InputTitle>
												<Grid container spacing={2}>
													<Grid item xs={12} sm={5}>
														<DateTimePicker
															label="Timeline Time & Date"
															value={timelineDateInput}
															onChange={(value: DateTime) => setTimelineDateInput(value)}
														/>
													</Grid>
													<Grid item xs={12} sm={6}>
														<TextInput
															name="timeline"
															label="Timeline description"
															value={timelineDescInput}
															onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
																setTimelineDescInput(e.target.value)
															}
														/>
													</Grid>
													<Grid item xs={12} sm={1}>
														<BoxButton
															onClick={() => addTimelineItemHandler(setFieldValue, values)}
															sx={{
																width: "100%",
																height: "100%",
																backgroundColor: "primary.main",
																color: "#fff"
															}}
														>
															<AddIcon />
														</BoxButton>
													</Grid>
												</Grid>
											</Grid>
											{[...values.timeline, ...orderData.waybillTimeline]
												.sort(_sortByDateDesc)
												.map((item: TransactionTimelineItem & { waybill?: boolean }, i) => (
													<Grid
														key={item.description + item.timeline_date}
														container
														item
														xs={12}
														spacing={2}
													>
														<Grid item xs={12}>
															<TimelineItem>
																<Stack gap={1}>
																	<Stack direction="row" gap={1}>
																		<StatusBadge color="secondary">
																			{formatDateTimeline(item.timeline_date)}
																		</StatusBadge>
																		{item.waybill && (
																			<StatusBadge color="info">
																				{orderData.shipping_details.shipping_courier}
																			</StatusBadge>
																		)}
																	</Stack>
																	<TimelineText>{item.description}</TimelineText>
																</Stack>
																<TimelineAction>
																	{!item.waybill && (
																		<IconButton
																			onClick={() =>
																				removeTimelineItemHandler(setFieldValue, values, i)
																			}
																		>
																			<ClearIcon fontSize="small" />
																		</IconButton>
																	)}
																</TimelineAction>
															</TimelineItem>
														</Grid>
													</Grid>
												))}
										</Grid>
									</Grid>
								</Grid>
							</FormContainer>
						)}
					</>
				)}
			</Formik>
		</EditOrderContainer>
	);
};

export default EditOrder;
