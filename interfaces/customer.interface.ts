// Types
import { Voucher } from "./voucher.interface";

export type CustomerStatus = "active" | "banned";

export interface CustomerAddress {
	id: number;
	user_id: number;
	recipient_name: string;
	contact: string;
	address: string;
	is_default: boolean;
}

export interface CustomerLastSeen {
	id: number;
	user_id: number;
	product_id: string;
	seen_date: string;
}

export interface CustomerWishlist {
	id: number;
	user_id: number;
	product_id: number;
	size: string;
}

export interface Customer {
	id: number;
	user_id?: number;
	full_name: string;
	email: string;
	contact: string;
	profile_image: string;
	prev_status?: CustomerStatus;
	user_status: CustomerStatus;
	credits: number;
	banned_date: string;
	created_at: string;
	user_role: string;
	address: CustomerAddress[];
	vouchers: Voucher[];
}

export interface GetCustomersQuery {
	page: number;
	q: string;
	statusFilter: string;
}

export type CustomersFilterValues = "default" | "active" | "banned";
