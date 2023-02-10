export interface ConversationMessage {
	id: number;
	title: string;
	created_by: number;
	created_at: string;
	messages: Message[];
}

export interface Conversation {
	id: number;
	title: string;
	created_by: number;
	created_at: string;
	latest_message: Message;
	full_name: string;
	profile_picture: string;
	contact: string;
	unread_message: string;
}

export interface Message {
	id: number;
	conversation_id: number;
	body: string;
	sender_id: number;
	created_at: string;
	email: string;
}

export interface GetConversationListQuery {
	page: number | string;
}

export interface GetConversationQuery {
	conversationId: number;
	currentCursor: number;
}

export interface ConversationStateItem {
	conversationId: number;
	messages: Message[];
	latestMessage: Message;
	currentCursor: number;
	chatCursor: number;
	minCursor: number;
	maxCursor: number;
	nextCursor: number;
	fullName: string;
	profilePicture: string;
	contact: string;
	unreadMessage: number;
	userTyping: string;
}
