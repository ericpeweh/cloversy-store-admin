// Dependencies
import React from "react";
import { shallowEqual } from "react-redux";

// Styles
import {
	ChattingHeaderContainer,
	ContactDetail,
	Name,
	NameContainer
} from "./ChattingHeader.styles";

// Icons
import ContactsIcon from "@mui/icons-material/Contacts";

// Hooks
import useSelector from "../../../hooks/useSelector";

// Components
import { Avatar, Badge, IconButton } from "@mui/material";

interface ChattingHeaderProps {
	showSidebar: boolean;
	onShowSidebar: () => void;
	onHideSidebar: () => void;
}

const ChattingHeader = ({ showSidebar, onHideSidebar, onShowSidebar }: ChattingHeaderProps) => {
	const { selectedConversationId, conversations, activeUsers } = useSelector(
		state => state.chat,
		shallowEqual
	);
	const conversation = conversations.find(item => item.conversationId === selectedConversationId);

	const isUserActive =
		activeUsers.findIndex(user => user.full_name === conversation?.fullName) !== -1;

	return (
		<ChattingHeaderContainer>
			{conversation && (
				<>
					<Badge
						color={isUserActive ? "primary" : "error"}
						overlap="circular"
						badgeContent={isUserActive ? "ON" : "OFF"}
					>
						<Avatar
							sx={{ width: { xs: 45, sm: 52, md: 60 }, height: { xs: 45, sm: 52, md: 60 } }}
							alt="user profile"
							src={conversation.profilePicture}
							imgProps={{ referrerPolicy: "no-referrer" }}
						/>
					</Badge>
					<NameContainer>
						<Name>{conversation.fullName}</Name>
						{conversation.userTyping ? (
							<ContactDetail>{conversation.userTyping}</ContactDetail>
						) : (
							<ContactDetail>{`Customer ${
								conversation.contact ? ` | ${conversation.contact}` : ""
							}`}</ContactDetail>
						)}
					</NameContainer>
					<IconButton
						sx={{ ml: "auto", display: { xs: "flex", md: "none" } }}
						onClick={() => (showSidebar ? onHideSidebar() : onShowSidebar())}
					>
						<ContactsIcon />
					</IconButton>
				</>
			)}
		</ChattingHeaderContainer>
	);
};

export default ChattingHeader;
