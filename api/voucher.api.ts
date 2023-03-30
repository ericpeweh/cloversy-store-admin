// Dependencies
import API from "./index";

// Types
import { Voucher, ResponseWithPagination, GetVouchersQuery, ResponseBody } from "../interfaces";

const voucherApi = API.injectEndpoints({
	endpoints: build => ({
		getVouchers: build.query<ResponseWithPagination<{ vouchers: Voucher[] }>, GetVouchersQuery>({
			query: ({ page, sortBy, statusFilter }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					status: statusFilter === "default" ? "" : statusFilter,
					sortBy: sortBy === "default" ? "" : sortBy
				});

				return `vouchers?${params.toString()}`;
			},
			providesTags: ["Vouchers"]
		}),
		getVoucherDetail: build.query<
			ResponseBody<{ voucher: Voucher }>,
			{ voucherCode: string | string[] | undefined; analyticYearFilter: string }
		>({
			query: ({ voucherCode, analyticYearFilter }) => {
				return `vouchers/${voucherCode}?analytic_year=${analyticYearFilter}`;
			},
			providesTags: res => [{ type: "Voucher", id: res?.data.voucher.code }]
		}),
		createVoucher: build.mutation<ResponseBody<{ newVoucher: Voucher }>, Partial<Voucher>>({
			query: newVoucherData => ({
				url: "vouchers",
				method: "POST",
				body: newVoucherData
			}),
			invalidatesTags: ["Vouchers"]
		}),
		updateVoucher: build.mutation<ResponseBody<{ updatedVoucher: Voucher }>, Partial<Voucher>>({
			query: ({ code: voucherCode, ...updatedVoucherData }) => ({
				url: `vouchers/${voucherCode}`,
				method: "PUT",
				body: updatedVoucherData
			}),
			invalidatesTags: res => [{ type: "Voucher", id: res?.data.updatedVoucher.code }, "Vouchers"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetVouchersQuery,
	useCreateVoucherMutation,
	useUpdateVoucherMutation,
	useGetVoucherDetailQuery
} = voucherApi;

export default voucherApi;
