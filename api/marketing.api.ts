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
	UpdateNotifMarketingData,
	EmailTemplate,
	EmailMarketingItem,
	CreateEmailMarketingData,
	GetEmailMarketingsQuery,
	EmailMarketingItemDetail,
	UpdateEmailMarketingData
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
		}),
		getEmailTemplates: build.query<ResponseBody<{ emailsTemplate: EmailTemplate[] }>, boolean>({
			query: () => {
				return `marketing/emails/template`;
			},
			providesTags: ["Email Templates"]
		}),
		createEmailMarketing: build.mutation<
			ResponseBody<{ newEmailMarketing: EmailMarketingItem }>,
			CreateEmailMarketingData
		>({
			query: newEmailMarketingData => ({
				url: "marketing/emails",
				method: "POST",
				body: newEmailMarketingData
			}),
			invalidatesTags: ["Email Marketings", "Scheduled Email Marketings"]
		}),
		getEmailMarketings: build.query<
			ResponseWithPagination<{ emailMarketings: EmailMarketingItem[] }>,
			GetEmailMarketingsQuery
		>({
			query: ({ page, q }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q
				});

				return `marketing/emails?${params.toString()}`;
			},
			providesTags: ["Email Marketings"]
		}),
		getScheduledEmailMarketings: build.query<
			ResponseWithPagination<{ emailMarketings: EmailMarketingItem[] }>,
			null
		>({
			query: () => {
				const params = new URLSearchParams({
					page: "",
					scheduled: "true"
				});

				return `marketing/emails?${params.toString()}`;
			},
			providesTags: ["Scheduled Email Marketings"]
		}),
		getEmailMarketingDetail: build.query<
			ResponseBody<{ emailMarketing: EmailMarketingItemDetail }>,
			string | string[] | undefined
		>({
			query: emailMarketingId => {
				return `marketing/emails/${emailMarketingId}`;
			},
			providesTags: res => [{ type: "Email Marketing", id: res?.data.emailMarketing.id }]
		}),
		updateEmailMarketing: build.mutation<
			ResponseBody<{ updatedEmailMarketing: EmailMarketingItemDetail }>,
			UpdateEmailMarketingData
		>({
			query: ({ emailMarketingId, ...updatedEmailMMarketingData }) => ({
				url: `marketing/emails/${emailMarketingId}`,
				method: "PUT",
				body: updatedEmailMMarketingData
			}),
			invalidatesTags: res => [
				{ type: "Email Marketing", id: res?.data.updatedEmailMarketing.id },
				"Email Marketings",
				"Scheduled Email Marketings"
			]
		}),
		cancelEmailMarketing: build.mutation<
			ResponseBody<{ canceledEmailMarketingId: number }>,
			string
		>({
			query: emailMarketingId => ({
				url: `marketing/emails/${emailMarketingId}/cancel`,
				method: "POST"
			}),
			invalidatesTags: res => [
				{ type: "Email Marketing", id: res?.data.canceledEmailMarketingId },
				"Email Marketings",
				"Scheduled Email Marketings"
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
	useCancelNotifMarketingMutation,
	useGetEmailTemplatesQuery,
	useCreateEmailMarketingMutation,
	useGetEmailMarketingsQuery,
	useGetScheduledEmailMarketingsQuery,
	useGetEmailMarketingDetailQuery,
	useUpdateEmailMarketingMutation,
	useCancelEmailMarketingMutation
} = marketingApi;

export default marketingApi;
