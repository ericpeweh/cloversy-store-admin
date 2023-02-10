// Dependencies
import API from "./index";

// Types
import {
	Conversation,
	ResponseWithCursorPagination,
	GetConversationQuery,
	ResponseWithPagination,
	GetConversationListQuery,
	ConversationMessage
} from "../interfaces";

const chatApi = API.injectEndpoints({
	endpoints: build => ({
		getConversationList: build.query<
			ResponseWithPagination<{ conversations: Conversation[] }>,
			GetConversationListQuery
		>({
			query: ({ page }) => {
				const params = new URLSearchParams({
					page: page.toString()
				});

				return `chat?${params.toString()}`;
			}
		}),
		getConversation: build.query<
			ResponseWithCursorPagination<{ conversation: ConversationMessage }>,
			GetConversationQuery
		>({
			query: ({ conversationId, currentCursor }) => {
				const params = new URLSearchParams({
					currentCursor: currentCursor === -1 ? "" : currentCursor.toString()
				});

				return `chat/${conversationId}?${params.toString()}`;
			}
		})
	}),
	overrideExisting: false
});

export const { useGetConversationQuery, useGetConversationListQuery } = chatApi;

export default chatApi;
