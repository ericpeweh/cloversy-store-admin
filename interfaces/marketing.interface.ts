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

export interface UpdateNotifMarketingData extends CreateNotifMarketingData {
	notifMarketingId: number;
	selectedUserIds: number[];
	removedUserIds: number[];
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
	canceled: boolean;
}

export interface NotifMarketingItemDetail extends NotifMarketingItem {
	selectedUsers: Partial<Customer>[];
}

export interface EmailMarketingItemDetail extends EmailMarketingItem {
	selectedUsers: Partial<Customer>[];
}

export interface GetNotifMarketingsQuery {
	page: number;
	q: string;
}

export interface GetEmailMarketingsQuery {
	page: number;
	q: string;
}

export interface CreateEmailMarketingData {
	title: string;
	description: string | undefined;
	scheduled: string | null;
	selectedUserIds: number[];
	email_subject: string;
	sendTo: "all" | "selected";
	templateId: number;
	params: { [key: string]: string };
}

export interface UpdateEmailMarketingData extends CreateEmailMarketingData {
	emailMarketingId: number;
	selectedUserIds: number[];
	removedUserIds: number[];
}

export interface EmailTemplate {
	id: number;
	name: string;
	subject: string;
	isActive: boolean;
	testSent: boolean;
	sender: {
		name: string;
		email: string;
		id: string;
	};
	replyTo: string;
	toField: string;
	tag: string;
	htmlContent: string;
	createdAt: string;
	modifiedAt: string;
	params: string[];
}

export interface EmailMarketingItem {
	id: number;
	notification_code: string;
	title: string;
	sent_at: string | null;
	scheduled: string | null;
	description: string | null;
	email_subject: string;
	send_to: "selected";
	canceled: boolean;
	params: { [key: string]: string };
	created_at: string;
	target_count: number;
	success_count: number;
	failure_count: number;
	failed_emails: string[];
	template_id: number;
}
