// Types
import { Customer } from "./customer.interface";

export interface Voucher {
	code: string;
	title: string;
	expiry_date: string;
	discount: number;
	discount_type: string;
	status: "active" | "disabled";
	usage_limit: number;
	current_usage: number;
	created_at: string;
	voucher_scope: string;
	description: string;
	selectedUsers: Partial<Customer>[];
}

export type VouchersStatusValues = "default" | "active" | "disabled";

export interface GetVouchersQuery {
	page: number;
	statusFilter: VouchersStatusValues;
	sortBy: string;
}

export type VouchersSortValues = "default" | "current_usage" | "expiry_date";

export interface CreateVoucherBody extends Voucher {
	selectedUserIds: number[];
}

export interface UpdateVoucherBody extends Voucher {
	selectedUserIds: number[];
	removedUserIds: number[];
}
