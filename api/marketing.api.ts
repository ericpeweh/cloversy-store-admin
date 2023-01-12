// Dependencies
import API from "./index";

// Types
import {
	NotifMarketingItem,
	ResponseWithPagination,
	GetNotifMarketingsQuery,
	ResponseBody,
	CreateNotifMarketingData
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
		getNotifMarketingDetail: build.query<
			ResponseBody<{ notifMarketing: NotifMarketingItem }>,
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
			invalidatesTags: ["Notif Marketings"]
		})
		// updateNotifMarketing: build.mutation<ResponseBody<{ updatedNotifMarketing: Voucher }>, Partial<Voucher>>({
		// 	query: ({ code: voucherCode, ...updatedVoucherData }) => ({
		// 		url: `vouchers/${voucherCode}`,
		// 		method: "PUT",
		// 		body: updatedVoucherData
		// 	}),
		// 	invalidatesTags: res => [{ type: "Voucher", id: res?.data.updatedVoucher.code }, "Vouchers"]
		// })
	}),
	overrideExisting: false
});

export const {
	useGetNotifMarketingsQuery,
	useGetNotifMarketingDetailQuery,
	useCreateNotifMarketingMutation
} = marketingApi;

export default marketingApi;
