// Dependencies
import API from "./index";

// Types
import {
	NotifMarketingItem,
	ResponseWithPagination,
	GetNotifMarketingsQuery,
	ResponseBody,
	CreateNotifMarketingData,
	NotifMarketingItemDetail,
	UpdateNotifMarketingData
} from "../interfaces";

const marketingApi = API.injectEndpoints({
	endpoints: build => ({
		getNotifMarketings: build.query<
			ResponseWithPagination<{ notifMarketings: NotifMarketingItem[] }>,
			GetNotifMarketingsQuery
		>({
			query: ({ page, q }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q
				});

				return `marketing/notifications?${params.toString()}`;
			},
			providesTags: ["Notif Marketings"]
		}),
		getScheduledNotifMarketings: build.query<
			ResponseWithPagination<{ notifMarketings: NotifMarketingItem[] }>,
			null
		>({
			query: () => {
				const params = new URLSearchParams({
					page: "",
					scheduled: "true"
				});

				return `marketing/notifications?${params.toString()}`;
			},
			providesTags: ["Scheduled Notif Marketings"]
		}),
		getNotifMarketingDetail: build.query<
			ResponseBody<{ notifMarketing: NotifMarketingItemDetail }>,
			string | string[] | undefined
		>({
			query: notifMarketingId => {
				return `marketing/notifications/${notifMarketingId}`;
			},
			providesTags: res => [{ type: "Notif Marketing", id: res?.data.notifMarketing.id }]
		}),
		createNotifMarketing: build.mutation<
			ResponseBody<{ newNotifMarketing: NotifMarketingItem }>,
			CreateNotifMarketingData
		>({
			query: newNotifMarketingData => ({
				url: "marketing/notifications",
				method: "POST",
				body: newNotifMarketingData
			}),
			invalidatesTags: ["Notif Marketings", "Scheduled Notif Marketings"]
		}),
		updateNotifMarketing: build.mutation<
			ResponseBody<{ updatedNotifMarketing: NotifMarketingItemDetail }>,
			UpdateNotifMarketingData
		>({
			query: ({ notifMarketingId, ...updatedNotifMMarketingData }) => ({
				url: `marketing/notifications/${notifMarketingId}`,
				method: "PUT",
				body: updatedNotifMMarketingData
			}),
			invalidatesTags: res => [
				{ type: "Notif Marketing", id: res?.data.updatedNotifMarketing.id },
				"Notif Marketings",
				"Scheduled Notif Marketings"
			]
		}),
		cancelNotifMarketing: build.mutation<
			ResponseBody<{ canceledNotifMarketingId: number }>,
			string
		>({
			query: notifMarketingId => ({
				url: `marketing/notifications/${notifMarketingId}/cancel`,
				method: "POST"
			}),
			invalidatesTags: res => [
				{ type: "Notif Marketing", id: res?.data.canceledNotifMarketingId },
				"Notif Marketings",
				"Scheduled Notif Marketings"
			]
		})
	}),
	overrideExisting: false
});

export const {
	useGetNotifMarketingsQuery,
	useGetScheduledNotifMarketingsQuery,
	useGetNotifMarketingDetailQuery,
	useCreateNotifMarketingMutation,
	useUpdateNotifMarketingMutation,
	useCancelNotifMarketingMutation
} = marketingApi;

export default marketingApi;
