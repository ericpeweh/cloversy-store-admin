// Dependencies
import API from "./index";

// Types
import {
	Customer,
	ResponseWithPagination,
	GetCustomersQuery,
	ResponseBody,
	TransactionListItem,
	TransactionStatus,
	Transaction
} from "../interfaces";

const transactionApi = API.injectEndpoints({
	endpoints: build => ({
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
			ResponseBody<{ transaction: Transaction }>,
			string | string[] | undefined
		>({
			query: transactionId => {
				return `transactions/${transactionId}`;
			}
		})
	}),
	overrideExisting: false
});

export const { useGetUserTransactionsQuery } = transactionApi;

export default transactionApi;
