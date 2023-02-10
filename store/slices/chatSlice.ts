// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Types
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, ConversationStateItem, Conversation, User } from "../../interfaces";

interface ChatSliceState {
	conversations: ConversationStateItem[];
	selectedConversationId: number;
	page: number;
	currentPage: number;
	totalPages: number;
	activeUsers: Partial<User>[];
}

const initialState: ChatSliceState = {
	conversations: [],
	selectedConversationId: -1,
	page: 1,
	currentPage: 0,
	totalPages: 0,
	activeUsers: []
};

const _getConversationIndex = (state: ChatSliceState, conversationId: number) => {
	return state.conversations.findIndex(
		conversation => conversation.conversationId === conversationId
	);
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setConversationsPage: (state, { payload }: PayloadAction<number>) => {
			state.page = payload;
		},
		selectConversation: (state, { payload: newConversationId }: PayloadAction<number>) => {
			const conversationIndex = _getConversationIndex(state, newConversationId);
			if (conversationIndex === -1) return;

			state.selectedConversationId = newConversationId;
			state.conversations[conversationIndex].unreadMessage = 0;
		},
		setConversationsCurrentPage: (state, { payload }: PayloadAction<number>) => {
			state.currentPage = payload;
		},
		setConversationsTotalPages: (state, { payload }: PayloadAction<number>) => {
			state.totalPages = payload;
		},
		setUserTyping: (
			state,
			{
				payload: { userTyping, conversationId }
			}: PayloadAction<{ userTyping: string; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].userTyping = userTyping;
		},
		setLatestMessage: (
			state,
			{
				payload: { conversationId, message }
			}: PayloadAction<{ conversationId: number; message: Message }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].latestMessage = message;
		},
		setConversations: (state, { payload }: PayloadAction<Conversation[]>) => {
			state.conversations.push(
				...payload.map(item => ({
					conversationId: item.id,
					messages: [],
					latestMessage: item.latest_message,
					fullName: item.full_name,
					profilePicture: item.profile_picture,
					contact: item.contact,
					currentCursor: -1,
					chatCursor: -1,
					minCursor: 0,
					maxCursor: 0,
					nextCursor: 0,
					unreadMessage: +item.unread_message,
					userTyping: ""
				}))
			);

			// Set selected conversation id to first conversation if value is not set
			if (state.selectedConversationId === -1) {
				state.selectedConversationId = payload[0].id;
			}
		},
		setMessages: (
			state,
			{
				payload: { conversationId, messages }
			}: PayloadAction<{ messages: Message[]; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].messages.push(...messages);
		},
		addNewMessage: (
			state,
			{
				payload: { conversationId, newMessage }
			}: PayloadAction<{ newMessage: Message; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].messages = [
				newMessage,
				...state.conversations[conversationIndex].messages
			];
		},
		setCurrentCursor: (
			state,
			{
				payload: { conversationId, value }
			}: PayloadAction<{ value: number; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].currentCursor = value;
		},
		setChatCursor: (
			state,
			{
				payload: { conversationId, value }
			}: PayloadAction<{ value: number; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].chatCursor = value;
		},
		setConversationData: (
			state,
			{
				payload: { conversationId, min, max, next }
			}: PayloadAction<{ min: number; max: number; next: number; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			state.conversations[conversationIndex].minCursor = min;
			state.conversations[conversationIndex].maxCursor = max;
			state.conversations[conversationIndex].nextCursor = next;
		},
		setActiveUsers: (state, { payload }: PayloadAction<Partial<User>[]>) => {
			state.activeUsers = payload;
		},
		setUnreadMessageCount: (
			state,
			{
				payload: { conversationId, value }
			}: PayloadAction<{ value: number; conversationId: number }>
		) => {
			const conversationIndex = _getConversationIndex(state, conversationId);
			if (conversationIndex === -1) return;

			// Increase unread message count if payload value is -1
			state.conversations[conversationIndex].unreadMessage =
				value === -1 ? state.conversations[conversationIndex].unreadMessage + 1 : value;
		}
	}
});

export const {
	setConversationsPage,
	setConversationsCurrentPage,
	setConversations,
	setMessages,
	addNewMessage,
	setCurrentCursor,
	setChatCursor,
	setConversationData,
	setConversationsTotalPages,
	selectConversation,
	setActiveUsers,
	setUnreadMessageCount,
	setLatestMessage,
	setUserTyping
} = chatSlice.actions;

export default chatSlice.reducer;
