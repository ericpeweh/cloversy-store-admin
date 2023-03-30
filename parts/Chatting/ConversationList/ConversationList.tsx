// Dependencies
import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import InfiniteScroller from "react-infinite-scroll-component";

// Styles
import {
	ConversationPanelContainer,
	ConversationImage,
	ConversationLatest,
	ConversationTitle,
	ConversationContent,
	ConversationTime,
	HideConversationButton,
	ConversationItem
} from "./ConversationList.styles";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Utils
import { formatDateTimeOnly } from "../../../utils/formatDate";

// Hooks
import { useGetConversationListQuery } from "../../../api/chat.api";
import useSelector from "../../../hooks/useSelector";
import useDispatch from "../../../hooks/useDispatch";

// Actions
import {
	setConversations,
	setConversationsCurrentPage,
	setConversationsPage,
	setConversationsTotalPages,
	selectConversation,
	setUnreadMessageCount
} from "../../../store/slices/chatSlice";

// Components
import { Avatar, Badge, CircularProgress, Divider, Stack } from "@mui/material";
import StatusBadge from "../../../components/StatusBadge/StatusBadge";
import FallbackContainer from "../../../components/FallbackContainer/FallbackContainer";
import { ConversationStateItem } from "../../../interfaces";

interface ConversationListProps {
	showSidebar: boolean;
	onHideSidebar: () => void;
	onResetBottomMessage: () => void;
	messageAtBottom: number;
}

const _sortConversation = (a: ConversationStateItem, b: ConversationStateItem) => {
	// Sort by unread message count first
	// then sort by latest message created_by date
	if (a.unreadMessage > b.unreadMessage) {
		return -1;
	} else if (a.unreadMessage < b.unreadMessage) {
		return 1;
	} else {
		if (a.latestMessage === null) {
			return 1;
		} else if (b.latestMessage === null) {
			return -1;
		} else if (a.latestMessage.created_at > b.latestMessage.created_at) {
			return -1;
		} else if (a.latestMessage.created_at < b.latestMessage.created_at) {
			return 1;
		} else {
			return 0;
		}
	}
};

const _getConversationContent = (item: ConversationStateItem, authEmail: string) => {
	let content: string;

	if (item.userTyping) {
		content = item.userTyping;
	} else {
		if (item.latestMessage) {
			const writerPart = item.latestMessage.email === authEmail ? "Anda: " : "";
			const messagePart =
				item.latestMessage?.body.length > 30
					? item.latestMessage.body.slice(0, 25) + "..."
					: item.latestMessage.body;

			content = `${writerPart}${messagePart}`;
		} else {
			content = "Belum ada pesan";
		}
	}

	return content;
};

const ConversationList = ({
	onHideSidebar,
	showSidebar,
	onResetBottomMessage,
	messageAtBottom
}: ConversationListProps) => {
	const dispatch = useDispatch();
	const { isAuth, email: authEmail } = useSelector(state => state.auth, shallowEqual);
	const { currentPage, page, totalPages, selectedConversationId, conversations, activeUsers } =
		useSelector(state => state.chat, shallowEqual);

	const {
		data: conversationsData,
		isFetching: isGetConversationsFetching,
		isSuccess: isGetConversationsSuccess,
		error: getConversationsError,
		refetch: refetchConversations
	} = useGetConversationListQuery(
		{ page },
		{
			skip: !isAuth
		}
	);
	const conversationsError: any = getConversationsError;
	const noDataFound = conversationsData?.data.conversations.length === 0;

	useEffect(() => {
		if (conversationsData && isGetConversationsSuccess && !isGetConversationsFetching) {
			if (currentPage < conversationsData.page) {
				dispatch(setConversations(conversationsData.data.conversations));
				dispatch(setConversationsCurrentPage(conversationsData.page));
				dispatch(setConversationsTotalPages(conversationsData.totalPages));
			}
		}
	}, [
		conversationsData,
		currentPage,
		dispatch,
		isGetConversationsFetching,
		isGetConversationsSuccess
	]);

	const loadMoreHandler = () => {
		dispatch(setConversationsPage(page + 1));
	};

	const selectConversationHandler = (conversationId: number) => {
		// Move message at bottom to unread messages
		if (messageAtBottom > 0) {
			dispatch(
				setUnreadMessageCount({ conversationId: selectedConversationId, value: messageAtBottom })
			);
		}

		onResetBottomMessage();
		dispatch(selectConversation(conversationId));
	};

	return (
		<ConversationPanelContainer show={showSidebar} id="conversationListScroller">
			<HideConversationButton
				variant="text"
				startIcon={<ChevronLeftIcon />}
				onClick={onHideSidebar}
			>
				Hide Conversations
			</HideConversationButton>
			<InfiniteScroller
				dataLength={conversations.length}
				style={{ height: "100%", width: "100%" }}
				next={loadMoreHandler}
				hasMore={page < totalPages}
				loader={
					currentPage !== 0 && (
						<FallbackContainer size="small">
							<CircularProgress />
						</FallbackContainer>
					)
				}
				scrollableTarget="conversationListScroller"
			>
				{[...conversations].sort(_sortConversation).map((item, i) => {
					const isUserActive =
						activeUsers.findIndex(user => user.full_name === item.fullName) !== -1;

					return (
						<React.Fragment key={item.conversationId}>
							<ConversationItem
								onClick={() => selectConversationHandler(item.conversationId)}
								isSelected={selectedConversationId === item.conversationId}
							>
								<ConversationImage>
									<Badge
										color={isUserActive ? "primary" : "error"}
										overlap="circular"
										variant="dot"
										badgeContent=""
									>
										<Avatar
											sx={{ width: { xs: 40, sm: 45, md: 50 }, height: { xs: 40, sm: 45, md: 50 } }}
											src={item.profilePicture}
										/>
									</Badge>
								</ConversationImage>
								<ConversationContent>
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<ConversationTitle unread={item.unreadMessage > 0}>
											{item.fullName}
										</ConversationTitle>
										<ConversationTime unread={item.unreadMessage > 0}>
											{item.latestMessage ? formatDateTimeOnly(item.latestMessage.created_at) : ""}
										</ConversationTime>
									</Stack>
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<ConversationLatest
											unread={item.unreadMessage > 0}
											isAvailable={Boolean(item.latestMessage)}
										>
											{_getConversationContent(item, authEmail)}
										</ConversationLatest>
										{item.unreadMessage > 0 && <StatusBadge>{item.unreadMessage + ""}</StatusBadge>}
									</Stack>
								</ConversationContent>
							</ConversationItem>
							<Divider />
						</React.Fragment>
					);
				})}
			</InfiniteScroller>
		</ConversationPanelContainer>
	);
};

export default ConversationList;
