// Dependencies
import API from "./index";

// Types
import { ResponseWithPagination, ResponseBody, ProductReviewItem } from "../interfaces";

const reviewApi = API.injectEndpoints({
	endpoints: build => ({
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

export const { useGetOrderReviewsQuery } = reviewApi;

export default reviewApi;
