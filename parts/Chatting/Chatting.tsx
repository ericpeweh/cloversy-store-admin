// Dependencies
import { Avatar, Badge, Divider, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";

// Styles
import {
	BubbleGroup,
	ChatBubble,
	ChattingContainer,
	ChattingHeader,
	ConversationContainer,
	GroupTimestamp,
	Name,
	NameContainer,
	Position,
	BubbleTimestamp,
	ChattingActions,
	ChatInput,
	ChatPanelContainer,
	ConversationPanelContainer,
	Conversation,
	ConversationImage,
	ConversationLatest,
	ConversationTitle,
	ConversationContent,
	ConversationTime
} from "./Chatting.styles";

// Icons
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

// Components
import EmojiPicker from "../../components/EmojiPicker/EmojiPicker";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

const Chatting = () => {
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

	const showEmojiPickerHandler = () => setShowEmojiPicker(true);

	const hideEmojiPickerHandler = () => setShowEmojiPicker(false);

	return (
		<ChattingContainer>
			<ConversationPanelContainer>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
					<>
						<Conversation key={item}>
							<ConversationImage>
								<Avatar sx={{ width: 50, height: 50 }} src="/images/1.jpg" />
							</ConversationImage>
							<ConversationContent>
								<Stack direction="row" justifyContent="space-between" alignItems="center">
									<ConversationTitle unread={i === 0}>Mikici Cimol</ConversationTitle>
									<ConversationTime unread={i === 0}>13:04</ConversationTime>
								</Stack>
								<Stack direction="row" justifyContent="space-between" alignItems="center">
									<ConversationLatest unread={i === 0}>Hallo, selamat siang min</ConversationLatest>
									{i === 0 && <StatusBadge>3</StatusBadge>}
								</Stack>
							</ConversationContent>
						</Conversation>
						<Divider />
					</>
				))}
			</ConversationPanelContainer>
			<ChatPanelContainer>
				<ChattingHeader>
					<Badge color="primary" overlap="circular" badgeContent=" " variant="dot">
						<Avatar sx={{ width: 60, height: 60 }} src="/images/2.jpg" />
					</Badge>
					<NameContainer>
						<Name>Mikici Cimol</Name>
						<Position>mikicicimol@gmail.com | +62 812 1234 1234</Position>
					</NameContainer>
				</ChattingHeader>
				<ConversationContainer>
					<BubbleGroup>
						<ChatBubble align="right">
							Halo selamat pagi admin cloversy?<BubbleTimestamp>12:42</BubbleTimestamp>
						</ChatBubble>
						<ChatBubble align="right">
							Mau tanya untuk pengiriman PROD/2022123131/00001 apakah sudah dikirim?
							<BubbleTimestamp>12:43</BubbleTimestamp>
						</ChatBubble>
					</BubbleGroup>
					<GroupTimestamp>25 Jul 2022</GroupTimestamp>
					<BubbleGroup>
						<ChatBubble>
							Halo selamat pagi juga kak <BubbleTimestamp>13:01</BubbleTimestamp>
						</ChatBubble>
						<ChatBubble>
							Untuk saat ini pesanan dengna invoice PROD/2022123131/00001 sudah kita kirim ya,
							resinya akan kita kirim kembali disini saat sudah dicetak dan juga bisa dilihat
							melalui tab pesanan kakak. :) <BubbleTimestamp>13:02</BubbleTimestamp>
						</ChatBubble>
						<ChatBubble>
							Terima kasih<BubbleTimestamp>13:02</BubbleTimestamp>
						</ChatBubble>
					</BubbleGroup>
					<GroupTimestamp>26 Jul 2022</GroupTimestamp>
					<BubbleGroup>
						<ChatBubble align="right">
							Oke min terima kasih<BubbleTimestamp>20:00</BubbleTimestamp>
						</ChatBubble>
						<ChatBubble align="right">
							Nanti saya cek lagi untuk tracking pengirimannya
							<BubbleTimestamp>20:00</BubbleTimestamp>
						</ChatBubble>
					</BubbleGroup>
					<BubbleGroup>
						<ChatBubble>
							Siap kak sama-sama<BubbleTimestamp>20:30</BubbleTimestamp>
						</ChatBubble>
						<ChatBubble>
							Ada lagi yang bisa kita bantu jawab kak ?<BubbleTimestamp>20:31</BubbleTimestamp>
						</ChatBubble>
					</BubbleGroup>
					<BubbleGroup>
						<ChatBubble align="right">
							Untuk sekarang itu aja min<BubbleTimestamp>20:33</BubbleTimestamp>
						</ChatBubble>
					</BubbleGroup>
				</ConversationContainer>
				<ChattingActions>
					{showEmojiPicker && <EmojiPicker />}
					{showEmojiPicker && (
						<IconButton onClick={hideEmojiPickerHandler}>
							<CloseIcon />
						</IconButton>
					)}
					<IconButton onClick={showEmojiPickerHandler}>
						<EmojiEmotionsOutlinedIcon />
					</IconButton>
					<ChatInput placeholder="Ketik pesan" />
					<IconButton>
						<SendIcon />
					</IconButton>
				</ChattingActions>
			</ChatPanelContainer>
		</ChattingContainer>
	);
};

export default Chatting;
