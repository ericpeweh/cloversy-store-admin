export interface Customer {
	id: number;
	full_name: string;
	email: string;
	contact: string;
	profile_image: string;
	user_status: string;
	credits: number;
	banned_date: string;
	created_at: string;
	user_role: string;
}

export interface GetCustomersQuery {
	page: number;
	q: string;
	statusFilter: string;
}

export type CustomersFilterValues = "default" | "active" | "banned";
