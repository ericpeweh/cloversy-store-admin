// Dependencies
import React, { FormEvent, useCallback, useRef, useState } from "react";

// Styles
import { ChattingActionsForm, ChatInput, ScrollToBottomButton } from "./ChattingActions.styles";

// Icons
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

// Utils
import throttleEvent from "../../../utils/throttleEvent";

// Types
import { Socket } from "socket.io-client";

// Components
import EmojiPicker from "../../../components/EmojiPicker/EmojiPicker";
import { IconButton } from "@mui/material";

interface ChattingActionsProps {
	socket: Socket;
	conversationId: number;
	scrollToBottomRef: React.RefObject<HTMLSpanElement>;
	messageAtBottom: number;
	onResetMessageAtBottom: () => void;
}

let timeout: NodeJS.Timeout;

const ChattingActions = ({
	socket,
	conversationId,
	scrollToBottomRef,
	messageAtBottom,
	onResetMessageAtBottom
}: ChattingActionsProps) => {
	const messageInputRef = useRef<HTMLInputElement>(null);
	const [messageInput, setMessageInput] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

	const showEmojiPickerHandler = () => setShowEmojiPicker(true);
	const hideEmojiPickerHandler = () => setShowEmojiPicker(false);

	const scrollToBottomHandler = () => {
		if (scrollToBottomRef.current) {
			scrollToBottomRef.current.scrollIntoView({
				block: "nearest",
				inline: "center",
				behavior: "smooth"
			});
		}
	};

	const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (messageInput === "" || conversationId === -1) return;

		socket.emit("newMessage", {
			message: messageInput,
			conversationId
		});
		// Emit stop typing event (userTyping)
		stopTypingHandler();

		setMessageInput("");
		messageInputRef.current?.focus();

		// Scroll to bottom
		if (scrollToBottomRef.current) {
			setTimeout(() => {
				scrollToBottomHandler();
			}, 300);
		}
	};

	const stopTypingHandler = () => {
		socket.emit("userTyping", { conversationId, isTyping: false });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttledMessageTypingHandler = useCallback(
		throttleEvent(() => {
			socket.emit("userTyping", {
				conversationId,
				isTyping: true
			});
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(stopTypingHandler, 2500);
		}, 1000),
		[conversationId, socket]
	);

	return (
		<ChattingActionsForm onSubmit={sendMessageHandler}>
			{messageAtBottom > 0 && (
				<ScrollToBottomButton
					size="small"
					endIcon={<InfoIcon />}
					onClick={() => {
						scrollToBottomHandler();
						onResetMessageAtBottom();
					}}
				>
					{`${messageAtBottom} Pesan Baru`}
				</ScrollToBottomButton>
			)}
			{showEmojiPicker && <EmojiPicker onSelectEmoji={setMessageInput} />}
			{showEmojiPicker && (
				<IconButton onClick={hideEmojiPickerHandler}>
					<CloseIcon />
				</IconButton>
			)}
			<IconButton onClick={showEmojiPickerHandler}>
				<EmojiEmotionsOutlinedIcon />
			</IconButton>
			<ChatInput
				placeholder="Ketik pesan"
				value={messageInput}
				onChange={e => setMessageInput(e.target.value)}
				onInput={throttledMessageTypingHandler}
				ref={messageInputRef}
			/>
			<IconButton type="submit">
				<SendIcon />
			</IconButton>
		</ChattingActionsForm>
	);
};

export default ChattingActions;
