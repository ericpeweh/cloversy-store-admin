// Dependencies
import API from "./index";

// Types
import {
	ResponseWithPagination,
	ResponseBody,
	ProductReviewItem,
	GetReviewsQuery
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
				return `reviews/${transactionId.toUpperCase()}`;
			},
			providesTags: result =>
				result
					? [...result.data.reviews.map(({ id }) => ({ type: "Review" as const, id })), "Reviews"]
					: ["Reviews"]
		})
	}),
	overrideExisting: false
});

export const { useGetOrderReviewsQuery, useGetAllReviewsQuery } = reviewApi;

export default reviewApi;
