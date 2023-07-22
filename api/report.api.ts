// Dependencies
import API from "./index";

// Types
import { ResponseBody, GetSalesReportQuery, SalesReportItemData } from "../interfaces";

const reportApi = API.injectEndpoints({
	endpoints: build => ({
		getSalesReport: build.query<
			ResponseBody<{ reports: SalesReportItemData[] }>,
			GetSalesReportQuery
		>({
			query: ({ startDate, endDate }) => {
				const params = new URLSearchParams({
					startDate,
					endDate
				});

				return `/reports/sales?${params.toString()}`;
			}
		})
	}),
	overrideExisting: false
});

export const { useGetSalesReportQuery } = reportApi;

export default reportApi;
