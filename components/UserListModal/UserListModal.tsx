// Dependencies
import React from "react";

// Styles
import {
	UserContainer,
	UserContent,
	UserInfo,
	Username,
	UserOptions,
	UserPickerModalContainer,
	ModalTitle,
	Email,
	UserImage,
	UserPickerHeader
} from "../UserPickerModal/UserPickerModal.styles";

// Types
import { Customer } from "../../interfaces";

// Components
import { Divider, Avatar, Alert } from "@mui/material";
import CloseButton from "../CloseButton/CloseButton";
import FallbackContainer from "../FallbackContainer/FallbackContainer";

interface UserListModalProps {
	open: boolean;
	onClose: () => void;
	data: Partial<Customer>[];
}

const UserListModal = ({ open, onClose, data }: UserListModalProps) => {
	return (
		<UserPickerModalContainer open={open} onClose={onClose}>
			<CloseButton
				onClick={onClose}
				sx={{
					top: { xs: "1.5rem", sm: "2.5rem" },
					right: { xs: "2rem", sm: "3rem" },
					width: "3rem",
					height: "3rem"
				}}
			/>
			<UserPickerHeader>
				<ModalTitle>Customer list</ModalTitle>
			</UserPickerHeader>
			<Divider />
			<UserOptions>
				{data?.length === 0 && (
					<FallbackContainer>
						<Alert severity="info">No customer found.</Alert>
					</FallbackContainer>
				)}
				{data?.length > 0 &&
					data.map(user => (
						<UserContainer key={user.id}>
							<UserContent>
								<UserImage>
									<Avatar
										src={user.profile_picture}
										alt="user profile"
										imgProps={{ referrerPolicy: "no-referrer" }}
										sx={{ height: "100%", width: "100%" }}
									/>
								</UserImage>
								<UserInfo>
									<Username>{user.full_name}</Username>
									<Email>{user.email}</Email>
								</UserInfo>
							</UserContent>
						</UserContainer>
					))}
			</UserOptions>
		</UserPickerModalContainer>
	);
};

export default UserListModal;
