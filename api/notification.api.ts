// Dependencies
import API from "./index";

// Types
import {
	Brand,
	ResponseWithPagination,
	GetBrandsQuery,
	ResponseBody,
	NotificationItem,
	GetNotificationsQuery
} from "../interfaces";

const notificationApi = API.injectEndpoints({
	endpoints: build => ({
		getNotifications: build.query<
			ResponseWithPagination<{ notifications: NotificationItem[]; notRead: number }>,
			GetNotificationsQuery
		>({
			query: ({ page, type }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					type: type === "default" ? "" : type
				});

				return `notifications?${params.toString()}`;
			},
			providesTags: result =>
				result
					? [
							...result.data.notifications.map(({ id }) => ({ type: "Notification" as const, id })),
							"Notifications"
					  ]
					: ["Notifications"]
		}),
		readNotification: build.mutation<
			ResponseBody<{ readNotificationId: number; notRead: number }>,
			string
		>({
			query: (notificationId: string) => ({
				url: `notifications/${notificationId}/read`,
				method: "POST"
			})
		})
	}),
	overrideExisting: false
});

export const { useGetNotificationsQuery, useReadNotificationMutation } = notificationApi;

export default notificationApi;
