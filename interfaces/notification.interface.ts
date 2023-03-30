export interface NotificationItem {
	id: number;
	title: string;
	description: string;
	user_id: number;
	category_id: number;
	created_at: string;
	action_link: string | null;
	category_name: Omit<NotificationTypeFilter, "default">;
	is_read: boolean;
}

export type NotificationTypeFilter = "transaction" | "marketing" | "message" | "system" | "default";

export interface GetNotificationsQuery {
	page: number | string;
	type: NotificationTypeFilter;
}
