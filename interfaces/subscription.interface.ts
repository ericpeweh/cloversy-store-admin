export interface PushSubscriptionItem {
	id: number;
	token: string;
	user_id: number;
	last_online: string;
	profile_picture: string;
	full_name: string;
	email: string;
}

export interface GetPushSubscriptionsQuery {
	page: number;
	q: string;
}
