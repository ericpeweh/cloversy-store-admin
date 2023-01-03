// Dependencies
import API from "./index";

// Types
import {
	ResponseWithPagination,
	ResponseBody,
	TransactionListItem,
	TransactionStatus,
	GetTransactionsQuery,
	TransactionDetails,
	UpdateTransactionReqBody
} from "../interfaces";

const transactionApi = API.injectEndpoints({
	endpoints: build => ({
		getTransactions: build.query<
			ResponseWithPagination<{ transactions: TransactionListItem[] }>,
			GetTransactionsQuery
		>({
			query: ({ page, statusFilter, q, sortBy }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					status: statusFilter === "default" ? "" : statusFilter,
					q,
					sortBy: sortBy === "default" ? "created_at" : sortBy,
					limit: "10"
				});

				return `transactions?${params.toString()}`;
			},
			providesTags: ["Transactions"]
		}),
		getUserTransactions: build.query<
			ResponseWithPagination<{ transactions: TransactionListItem[] }>,
			{
				page: string;
				statusFilter: TransactionStatus | "default";
				userId: string | string[] | undefined;
			}
		>({
			query: ({ page, statusFilter, userId }) => {
				const params = new URLSearchParams({
					userId: userId + "",
					page: page.toString(),
					status: statusFilter === "default" ? "" : statusFilter
				});

				return `transactions?${params.toString()}`;
			}
		}),
		getTransactionDetails: build.query<
			ResponseBody<{ transaction: TransactionDetails }>,
			string | string[] | undefined
		>({
			query: transactionId => {
				return `transactions/${transactionId}`;
			},
			providesTags: res => [{ type: "Transaction", id: res?.data.transaction.id }]
		}),
		getTransactionDetailsToEdit: build.query<
			ResponseBody<{ transaction: TransactionDetails }>,
			string | string[] | undefined
		>({
			query: transactionId => {
				return `transactions/${transactionId}?noWaybill=1`;
			}
		}),
		updateTransaction: build.mutation<
			ResponseBody<{ updatedTransaction: TransactionDetails }>,
			UpdateTransactionReqBody
		>({
			query: ({ transactionId, ...updatedTransactionData }) => ({
				url: `transactions/${transactionId}`,
				method: "PATCH",
				body: updatedTransactionData
			}),
			invalidatesTags: res => [
				{ type: "Transaction", id: res?.data.updatedTransaction.id },
				"Transactions"
			]
		})
	}),
	overrideExisting: false
});

export const {
	useGetUserTransactionsQuery,
	useGetTransactionsQuery,
	useGetTransactionDetailsQuery,
	useGetTransactionDetailsToEditQuery,
	useUpdateTransactionMutation
} = transactionApi;

export default transactionApi;
