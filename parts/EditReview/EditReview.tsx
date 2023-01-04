// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import Head from "next/head";

// Styles
import { EditReviewContainer, FormContainer, InputTitle } from "./EditReview.styles";

// Types
import { ReviewsStatusValues, UpdateReviewBody } from "../../interfaces";
import type { DateTime as DateTimeType } from "luxon";

// Hooks
import useSelector from "../../hooks/useSelector";
import { useRouter } from "next/router";
import { useGetReviewQuery } from "../../api/review.api";
import { useUpdateReviewMutation } from "../../api/review.api";

// Icons
import DoneIcon from "@mui/icons-material/Done";

// Components
import { Alert, Box, CircularProgress, Grid, Rating, Stack } from "@mui/material";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import SelectInput from "../../components/SelectInput/SelectInput";
import BoxButton from "../../components/BoxButton/BoxButton";
import FallbackContainer from "../../components/FallbackContainer/FallbackContainer";
import PerformantTextInput from "../../components/PerformantTextInput/PerformantTextInput";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";

type UpdateReviewFormValues = {
	rating: number;
	review: string;
	status: Omit<ReviewsStatusValues, "default">;
	created_at: DateTimeType;
};

const UpdateReviewSchema = Yup.object().shape({
	rating: Yup.number().min(0.5).max(5).required(),
	review: Yup.string()
		.max(200, "Description must be maximum 200 characters.")
		.required("Review description is required!"),
	status: Yup.string().oneOf(["active", "disabled"])
});

const EditReview = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const router = useRouter();
	const { reviewId } = router.query;

	const {
		data: getReviewData,
		isLoading: isGetReviewLoading,
		isSuccess: isGetReviewSuccess,
		error: getReviewErrorData,
		refetch: refetchReview
	} = useGetReviewQuery(reviewId as string, {
		skip: !isAuth
	});
	const getReviewError: any = getReviewErrorData;
	const reviewData = getReviewData?.data.review;

	const [formInitialValues, setFormInitialValues] = useState<UpdateReviewFormValues>({
		rating: 5,
		review: "",
		status: "active",
		created_at: DateTime.now()
	});

	// Fill form initial values
	useEffect(() => {
		if (reviewData && isGetReviewSuccess) {
			setFormInitialValues({
				rating: +reviewData.rating || 5,
				review: reviewData.description ?? "",
				status: reviewData.status ?? "active",
				created_at: reviewData?.created_at
					? DateTime.fromISO(reviewData.created_at)
					: DateTime.now()
			});
		}
	}, [reviewData, isGetReviewSuccess]);

	const [
		updateReview,
		{ isLoading: isUpdateReviewLoading, error: updateReviewErrorData, reset: resetUpdateReview }
	] = useUpdateReviewMutation();
	const updateReviewError: any = updateReviewErrorData;

	const updateReviewHandler = async (data: UpdateReviewFormValues) => {
		const updatedReviewData: UpdateReviewBody = {
			...data,
			rating: data.rating * 2,
			id: reviewId?.toString() || "",
			created_at: data.created_at.toISO().slice(0, 23)
		};

		const result = await updateReview(updatedReviewData).unwrap();

		if (result.status === "success") {
			resetUpdateReview();
			router.back();
		}
	};

	return (
		<>
			<Head>
				<title>
					Edit Review | {`${reviewData?.id} - ${reviewData?.product_title}` || "Loading..."}
				</title>
			</Head>
			<EditReviewContainer>
				<Formik
					initialValues={formInitialValues}
					validationSchema={UpdateReviewSchema}
					enableReinitialize={true}
					onSubmit={values => updateReviewHandler(values)}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
						<>
							<Stack direction="row" alignItems="center" justifyContent="space-between">
								<PageTitle>Edit Review</PageTitle>
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
										loading={isUpdateReviewLoading}
										onClick={() => handleSubmit()}
									>
										Update Review
									</Button>
								</Stack>
							</Stack>
							{!isGetReviewLoading && getReviewError && (
								<FallbackContainer>
									<Alert severity="error">{getReviewError.data.message}</Alert>
									<BoxButton onClick={refetchReview}>Try again</BoxButton>
								</FallbackContainer>
							)}
							{isGetReviewLoading && (
								<FallbackContainer>
									<CircularProgress />
								</FallbackContainer>
							)}
							{updateReviewError && (
								<Alert severity="error" sx={{ mt: 1 }}>
									{updateReviewError.data.message}
								</Alert>
							)}
							{isGetReviewSuccess && reviewData && (
								<FormContainer>
									<Grid container spacing={{ xs: 2, lg: 3 }} alignItems="flex-start">
										<Grid item xs={12} xl={6}>
											<Grid container spacing={{ xs: 2, md: 3 }}>
												<Grid item xs={12}>
													<InputTitle>Review data</InputTitle>
													<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
														<Rating
															name="rating"
															value={values.rating}
															size="large"
															precision={0.5}
															onChange={handleChange}
															onBlur={handleBlur}
														/>
													</Box>
												</Grid>
												<Grid item xs={12}>
													<DateTimePicker
														label="Review created"
														value={values.created_at}
														onChange={(value: DateTime) => {
															if (value.isValid) {
																setFieldValue("created_at", value);
															}
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<SelectInput
														name="status"
														options={[
															{ label: "Active", value: "active" },
															{ label: "Disabled", value: "disabled" }
														]}
														value={values.status as string}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.status && touched.status)}
													/>
												</Grid>
												<Grid item xs={12}>
													<Box sx={{ position: "relative" }}>
														<PerformantTextInput
															name="review"
															label="Review description"
															multiline
															rows={5}
															value={values.review}
															onChange={handleChange}
															onBlur={handleBlur}
															error={Boolean(errors.review && touched.review)}
															maxLength={200}
														/>
													</Box>
													{errors.review && touched.review && (
														<Alert severity="error" sx={{ mt: 2 }}>
															{errors.review}
														</Alert>
													)}
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12} xl={6}>
											<Grid container>
												<Grid item xs={12}>
													<InputTitle>Preview (BEFORE)</InputTitle>
												</Grid>
												<Grid item xs={12}>
													<ReviewItem
														reviewData={reviewData}
														previewMode={true}
														sx={{
															width: "100%",
															backgroundColor: "#f9f9f9 !important",
															border: "1px solid #999"
														}}
													/>
												</Grid>
												<Grid item xs={12} sx={{ mt: { xs: 1, sm: 2, md: 3 } }}>
													<InputTitle>Preview (AFTER)</InputTitle>
												</Grid>
												<Grid item xs={12}>
													<ReviewItem
														reviewData={{
															...reviewData,
															created_at: values.created_at.toISO(),
															description: values.review,
															status: values.status as string,
															rating: values.rating.toString()
														}}
														previewMode={true}
														sx={{
															width: "100%",
															backgroundColor: "#f9f9f9 !important",
															border: "1px solid #999"
														}}
													/>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</FormContainer>
							)}
						</>
					)}
				</Formik>
			</EditReviewContainer>
		</>
	);
};

export default EditReview;
