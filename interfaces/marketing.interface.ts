// Types
import { Customer } from "./customer.interface";

export interface CreateNotifMarketingData {
	title: string;
	description: string | undefined;
	scheduled: string | null;
	selectedUserIds: number[];
	message_title: string;
	message_body: string;
	image_url: string | undefined;
	action_link: string | undefined;
	action_title: string | undefined;
	sendTo: "all" | "selected";
}

export interface NotifMarketingItem {
	id: number;
	notification_code: string;
	title: string;
	sent_at: string | null;
	scheduled: string | null;
	description: string | null;
	message_title: string;
	message_body: string;
	image_url: string | null;
	action_link: string | null;
	action_title: string | null;
	success_count: number;
	failure_count: number;
	created_at: string;
	send_to: "all" | "selected";
	target_count: number;
}

export interface NotifMarketingItemDetail extends NotifMarketingItem {
	selectedUsers: Partial<Customer>[];
}

export interface GetNotifMarketingsQuery {
	page: number;
	q: string;
}
