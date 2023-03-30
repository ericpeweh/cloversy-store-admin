// Dependencies
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";

// Styles
import { ChattingContainer, ChatPanelContainer } from "./Chatting.styles";

// Hooks
import useSelector from "../../hooks/useSelector";

// Utils
import initSocketIO from "../../utils/initSocketIO";

// Types
import { Message, User } from "../../interfaces";

// Components
import { Alert } from "@mui/material";

// Parts
import ChattingActions from "./ChattingActions/ChattingActions";
import ChattingHeader from "./ChattingHeader/ChattingHeader";
import Conversation from "./Conversation/Conversation";
import ConversationList from "./ConversationList/ConversationList";
import { useGetConversationQuery } from "../../api/chat.api";
import useDispatch from "../../hooks/useDispatch";
import {
	addNewMessage,
	setActiveUsers,
	setChatCursor,
	setConversationData,
	setCurrentCursor,
	setLatestMessage,
	setMessages,
	setUnreadMessageCount,
	setUserTyping
} from "../../store/slices/chatSlice";

// Init web socket connection
const socketClient = initSocketIO();

const Chatting = () => {
	const dispatch = useDispatch();
	const { isAuth, token, email: authEmail } = useSelector(state => state.auth, shallowEqual);
	const { selectedConversationId, conversations } = useSelector(state => state.chat, shallowEqual);
	const [connectError, setConnectError] = useState(false);
	const [showConversationSidebar, setShowConversationSidebar] = useState<boolean>(false);
	const [scrollToMessageId, setScrollToMessageId] = useState("");

	// Scroll to bottom feature
	const scrollToBottomRef = useRef<HTMLSpanElement>(null);
	const [messageAtBottom, setMessageAtBottom] = useState(0);

	const {
		conversationId,
		chatCursor = -1,
		currentCursor = -1,
		minCursor = 0,
		nextCursor = 0,
		unreadMessage = 0
	} = conversations.find(item => item.conversationId === selectedConversationId) || {};

	const {
		data: conversationData,
		isFetching: isGetConversationFetching,
		isLoading: isGetConversationLoading,
		isSuccess: isGetConversationSuccess
	} = useGetConversationQuery(
		{ currentCursor: chatCursor || -1, conversationId: selectedConversationId },
		{
			skip: !isAuth || !conversationId
		}
	);

	useEffect(() => {
		if (
			conversationData &&
			currentCursor &&
			isGetConversationSuccess &&
			!isGetConversationFetching
		) {
			if (currentCursor === -1 || currentCursor > conversationData.currentCursor) {
				const { currentCursor, data, minCursor, maxCursor, nextCursor } = conversationData;

				// Store first mesage id to allow scroll to view
				setScrollToMessageId(data.conversation.messages[0]?.id + "");

				dispatch(
					setMessages({
						conversationId: selectedConversationId,
						messages: data.conversation.messages
					})
				);
				dispatch(
					setCurrentCursor({ conversationId: selectedConversationId, value: currentCursor })
				);
				dispatch(
					setConversationData({
						conversationId: selectedConversationId,
						min: minCursor,
						max: maxCursor,
						next: nextCursor
					})
				);
			}
		}
	}, [
		conversationData,
		currentCursor,
		dispatch,
		isGetConversationFetching,
		isGetConversationSuccess,
		selectedConversationId
	]);

	const loadMoreMessageHandler = () => {
		if (conversationId) {
			dispatch(
				setChatCursor({
					conversationId: selectedConversationId,
					value: nextCursor
				})
			);
		}
	};

	const showConversationHandler = () => setShowConversationSidebar(true);
	const hideConversationHandler = () => setShowConversationSidebar(false);

	useEffect(() => {
		if (isAuth && token) {
			if (!socketClient.socket.connected) {
				socketClient.connect(token);
			}

			// Connection success
			socketClient.socket.on("connect", () => {
				setConnectError(false);
			});

			// Failed connect to websocket server
			socketClient.socket.on("connect_error", () => {
				setConnectError(true);
			});

			// Handle incoming message
			socketClient.socket.on("newMessageResponse", (newMessage: Message) => {
				// Store message to related conversation
				dispatch(addNewMessage({ conversationId: newMessage.conversation_id, newMessage }));

				// Track latest message of conversation
				dispatch(
					setLatestMessage({ conversationId: newMessage.conversation_id, message: newMessage })
				);

				// Increase message at bottom count if user at the current conversation tab
				if (
					newMessage.conversation_id === selectedConversationId &&
					newMessage.email !== authEmail
				) {
					setMessageAtBottom(prev => prev + 1);
				}

				// Track unread messages count
				if (
					newMessage.conversation_id !== selectedConversationId &&
					newMessage.email !== authEmail
				) {
					dispatch(
						setUnreadMessageCount({ conversationId: newMessage.conversation_id, value: -1 })
					);
				}
			});

			// Active users feature
			socketClient.socket.on("activeUsers", (users: Partial<User>[]) => {
				dispatch(setActiveUsers(users));
			});

			// User typing feature
			socketClient.socket.on(
				"userTypingResponse",
				(data: {
					is_typing: boolean;
					full_name: string;
					conversation_id: string;
					email: string;
				}) => {
					// If user typing is chat opponent
					if (data.email !== authEmail) {
						const { is_typing, conversation_id, full_name } = data;

						dispatch(
							setUserTyping({
								conversationId: +conversation_id,
								userTyping: is_typing ? `${full_name} sedang mengetik...` : ""
							})
						);
					}
				}
			);
		}

		return () => {
			// socketClient.socket.disconnect();
			socketClient.socket.off("connect");
			socketClient.socket.off("connect_error");
			socketClient.socket.off("newMessageResponse");
			socketClient.socket.off("activeUsers");
			socketClient.socket.off("userTypingResponse");
		};
	}, [authEmail, conversationId, dispatch, isAuth, selectedConversationId, token]);

	const resetMessageAtBottomHandler = () => {
		setMessageAtBottom(0);
	};

	return (
		<ChattingContainer>
			<ConversationList
				showSidebar={showConversationSidebar}
				onHideSidebar={hideConversationHandler}
				messageAtBottom={messageAtBottom}
				onResetBottomMessage={resetMessageAtBottomHandler}
			/>
			<ChatPanelContainer>
				{connectError && (
					<Alert severity="error">Gagal terhubung ke sistem chat, menghubungkan kembali...</Alert>
				)}
				<ChattingHeader
					showSidebar={showConversationSidebar}
					onShowSidebar={showConversationHandler}
					onHideSidebar={hideConversationHandler}
				/>
				<Conversation
					onLoadMore={loadMoreMessageHandler}
					hasMore={nextCursor > minCursor && !isGetConversationFetching}
					scrollToMessageId={scrollToMessageId}
					setScrollToMessageId={setScrollToMessageId}
					isLoading={isGetConversationLoading}
					ref={scrollToBottomRef}
					onResetMessageAtBottom={resetMessageAtBottomHandler}
				/>
				<ChattingActions
					conversationId={selectedConversationId}
					socket={socketClient.socket}
					scrollToBottomRef={scrollToBottomRef}
					messageAtBottom={messageAtBottom}
					onResetMessageAtBottom={resetMessageAtBottomHandler}
				/>
			</ChatPanelContainer>
		</ChattingContainer>
	);
};

export default Chatting;
