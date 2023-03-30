// Dependencies
import API from "./index";

// Types
import { Customer, ResponseWithPagination, GetCustomersQuery, ResponseBody } from "../interfaces";

const customerApi = API.injectEndpoints({
	endpoints: build => ({
		getCustomers: build.query<ResponseWithPagination<{ customers: Customer[] }>, GetCustomersQuery>(
			{
				query: ({ page, q, statusFilter }) => {
					const params = new URLSearchParams({
						page: page.toString(),
						q,
						status: statusFilter === "default" ? "" : statusFilter
					});

					return `customers?${params.toString()}`;
				},
				providesTags: ["Customers"]
			}
		),
		getCustomerDetail: build.query<
			ResponseBody<{ customer: Customer }>,
			string | string[] | undefined
		>({
			query: customerId => {
				return `customers/${customerId}`;
			},
			providesTags: res => [{ type: "Customer", id: res?.data.customer.id }]
		}),
		updateCustomer: build.mutation<ResponseBody<{ updatedCustomer: Customer }>, Partial<Customer>>({
			query: ({ id: customerId, ...updatedCustomerData }) => ({
				url: `customers/${customerId}`,
				method: "PUT",
				body: updatedCustomerData
			}),
			invalidatesTags: res => [{ type: "Customer", id: res?.data.updatedCustomer.id }, "Customers"]
		})
	}),
	overrideExisting: false
});

export const { useGetCustomersQuery, useGetCustomerDetailQuery, useUpdateCustomerMutation } =
	customerApi;

export default customerApi;
