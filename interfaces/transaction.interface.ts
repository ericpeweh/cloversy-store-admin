export type TransactionStatus = "pending" | "process" | "sent" | "success" | "cancel";

export interface Transaction {
	id: string;
	user_id: string;
	order_status: TransactionStatus;
	gift_note: string;
	voucher_code: string;
	customer_note: string;
	created_at: string;
	subtotal: string;
	discount_total: string;
	total: string;
	is_reviewed: boolean;
}

export interface TransactionListItem extends Transaction {
	full_name: string;
	email: string;
}
