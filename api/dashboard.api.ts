// Dependencies
import API from "./index";

// Types
import { ResponseBody, GetDashboardDataQuery, DashboardData } from "../interfaces";

const dashboardApi = API.injectEndpoints({
	endpoints: build => ({
		getDashboardData: build.query<ResponseBody<DashboardData>, GetDashboardDataQuery>({
			query: ({ salesAnalyticYear, visitorAnalyticYear }) => {
				const params = new URLSearchParams({
					sales_analytic_year: salesAnalyticYear,
					visitor_analytic_year: visitorAnalyticYear
				});

				return `?${params.toString()}`;
			},
			providesTags: ["Dashboard"]
		})
	}),
	overrideExisting: false
});

export const { useGetDashboardDataQuery } = dashboardApi;

export default dashboardApi;
