// Types
import { ProductLastSeen } from "./product.interface";
import { Voucher } from "./voucher.interface";

export type CustomerStatus = "active" | "banned";

export interface CustomerAddress {
	id: number;
	recipient_name: string;
	contact: string;
	address: string;
	is_default: boolean;
	province: string;
	province_id: number;
	city: string;
	city_id: number;
	subdistrict: string;
	subdistrict_id: number;
	postal_code: string;
	label: string;
	shipping_note: string;
}

export interface CustomerLastSeen {
	id: number;
	user_id: number;
	product_id: string;
	seen_date: string;
}

export interface CustomerWishlist {
	id: number;
	product_id: number;
	user_id: number;
	size: string;
	title: string;
	images: string[];
	created_at: string;
}

export interface Customer {
	id: number;
	user_id?: number;
	full_name: string;
	email: string;
	contact: string;
	profile_picture: string;
	prev_status?: CustomerStatus;
	user_status: CustomerStatus;
	credits: number;
	banned_date: string;
	created_at: string;
	user_role: string;
	address: CustomerAddress[];
	vouchers: Voucher[];
	lastSeen: ProductLastSeen[];
	wishlist: CustomerWishlist[];
}

export interface GetCustomersQuery {
	page: number;
	q: string;
	statusFilter: string;
}

export type CustomersFilterValues = "default" | "active" | "banned";
