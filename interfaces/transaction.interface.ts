// Types
import { Address } from "./account.interface";

export type TransactionStatus = "pending" | "process" | "sent" | "success" | "cancel";

export type TransactionSortValues =
	| "default"
	| "created_at"
	| "status"
	| "low-to-high"
	| "high-to-low";

export type PaymentStatus =
	| "authorize"
	| "capture"
	| "settlement"
	| "deny"
	| "pending"
	| "cancel"
	| "refund"
	| "partial_refund"
	| "chargeback"
	| "partial_chargeback"
	| "expire"
	| "failure";

export type PaymentMethod = "gopay" | "bni" | "mandiri" | "permata" | "bri";

export interface Transaction {
	id: string;
	user_id: string;
	order_status: TransactionStatus;
	order_status_modified: string;
	gift_note: string;
	order_note: string;
	customer_note: string;
	voucher_code: string;
	discount_total: string;
	subtotal: string;
	total: string;
	created_at: string;
	is_reviewed: boolean;
}

export type GopayActionsObject = [
	{
		name: "generate-qr-code";
		method: "GET";
		url: string;
	},
	{
		name: "deeplink-redirect";
		method: "GET";
		url: string;
	},
	{
		name: "get-status";
		method: "GET";
		url: string;
	},
	{
		name: "cancel";
		method: "POST";
		url: string;
		fields: string[];
	}
];

export interface TransactionListItem extends Transaction {
	full_name: string;
	email: string;
}

export interface GetTransactionsQuery {
	page: number | string;
	statusFilter: TransactionStatus | "default";
	q: string;
	sortBy: string;
}

export interface TransactionShipping {
	transaction_id: string;
	shipping_cost: string;
	shipping_courier: string;
	shipping_service: string;
	shipping_tracking_code: string;
	shipping_etd: string;
}

export interface TransactionItem {
	product_id: number;
	quantity: number;
	price: string;
	product_size: string;
	title: string;
	slug: string;
	images: string[];
}

export interface PaymentDetailsItem {
	payment_method: PaymentMethod;
	payment_status: PaymentStatus;
	expire_time: string;
	bill_key?: string;
	biller_code?: string;
	va_number?: string;
	actions?: GopayActionsObject;
	payment_status_modified: string;
}

export interface TransactionTimelineItem {
	timeline_date: string;
	description: string;
}

export interface TransactionDetails extends Transaction {
	full_name: string;
	email: string;
	contact: string;
	voucher_title: string;
	voucher_discount_type: "value" | "percentage";
	voucher_discount: number;
	shipping_details: Address & TransactionShipping;
	item_details: TransactionItem[];
	payment_details: PaymentDetailsItem;
	timeline: TransactionTimelineItem[];
}

export interface UpdateTransactionFormValues {
	orderNote: string;
	customerNote: string;
	giftNote: string;
	shippingTrackingCode: string;
	timeline: TransactionTimelineItem[];
}

export interface UpdateTransactionReqBody extends Omit<UpdateTransactionFormValues, "timeline"> {
	transactionId: string;
	timelineObj: string;
}
