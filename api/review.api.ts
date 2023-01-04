// Dependencies
import API from "./index";

// Types
import {
	ResponseWithPagination,
	ResponseBody,
	ProductReviewItem,
	GetReviewsQuery,
	UpdateReviewBody
} from "../interfaces";

const reviewApi = API.injectEndpoints({
	endpoints: build => ({
		getAllReviews: build.query<
			ResponseWithPagination<{ reviews: ProductReviewItem[] }>,
			GetReviewsQuery
		>({
			query: ({ page, q, sortBy, statusFilter }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q,
					status: statusFilter === "default" ? "" : statusFilter,
					sortBy: sortBy === "default" ? "" : sortBy
				});

				return `reviews?${params.toString()}`;
			},
			providesTags: result =>
				result
					? [...result.data.reviews.map(({ id }) => ({ type: "Review" as const, id })), "Reviews"]
					: ["Reviews"]
		}),
		getOrderReviews: build.query<ResponseBody<{ reviews: ProductReviewItem[] }>, string>({
			query: transactionId => {
				return `reviews?transactionId=${transactionId.toUpperCase()}`;
			},
			providesTags: result =>
				result
					? [...result.data.reviews.map(({ id }) => ({ type: "Review" as const, id })), "Reviews"]
					: ["Reviews"]
		}),
		getReview: build.query<ResponseBody<{ review: ProductReviewItem }>, string>({
			query: reviewId => {
				return `reviews/${reviewId}`;
			},
			providesTags: result => [{ type: "Review" as const, id: result?.data.review.id }]
		}),
		updateReview: build.mutation<
			ResponseBody<{ updatedReview: ProductReviewItem }>,
			UpdateReviewBody
		>({
			query: ({ id: reviewId, ...updatedReviewData }) => ({
				url: `reviews/${reviewId}`,
				method: "PUT",
				body: updatedReviewData
			}),
			invalidatesTags: res => [{ type: "Review", id: res?.data.updatedReview.id }, "Reviews"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetOrderReviewsQuery,
	useGetAllReviewsQuery,
	useUpdateReviewMutation,
	useGetReviewQuery
} = reviewApi;

export default reviewApi;
