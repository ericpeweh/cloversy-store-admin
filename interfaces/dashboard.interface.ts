export interface DashboardData {
	salesTotal: string;
	transactionCount: string;
	productCount: string;
	customerCount: string;
	reviewCount: string;
	activeVoucherCount: string;
	analytics: { month: string; sales_count: string; app_views: string }[];
}

export interface GetDashboardDataQuery {
	salesAnalyticYear: string;
	visitorAnalyticYear: string;
}
