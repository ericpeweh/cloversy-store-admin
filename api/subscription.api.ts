// Dependencies
import API from "./index";

// Types
import {
	ResponseWithPagination,
	GetPushSubscriptionsQuery,
	PushSubscriptionItem
} from "../interfaces";

const subscriptionApi = API.injectEndpoints({
	endpoints: build => ({
		getPushSubscriptions: build.query<
			ResponseWithPagination<{ subscriptions: PushSubscriptionItem[] }>,
			GetPushSubscriptionsQuery
		>({
			query: ({ page, q }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q
				});

				return `subscription/push?${params.toString()}`;
			},
			providesTags: ["Push Subscriptions"]
		})
	}),
	overrideExisting: false
});

export const { useGetPushSubscriptionsQuery } = subscriptionApi;

export default subscriptionApi;
