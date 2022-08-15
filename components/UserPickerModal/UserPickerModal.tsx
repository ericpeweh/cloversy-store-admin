// Dependencies
import React from "react";
import Image from "next/image";

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
} from "./UserPickerModal.styles";

// Icons
import PlaceIcon from "@mui/icons-material/Place";

// Components
import { Divider, Stack } from "@mui/material";
import CloseButton from "../CloseButton/CloseButton";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

interface UserPickerModalProps {
	open: boolean;
	onClose: () => void;
}

const UserPickerModal = ({ open, onClose }: UserPickerModalProps) => {
	return (
		<UserPickerModalContainer open={open} onClose={onClose}>
			<CloseButton
				onClick={onClose}
				sx={{ top: "2.5rem", right: "3rem", width: "3rem", height: "3rem" }}
			/>
			<UserPickerHeader>
				<ModalTitle>Pilih customer</ModalTitle>
				<TextInput label="" placeholder="Search user..." id="search-user" size="small" />
			</UserPickerHeader>
			<Divider />
			<UserOptions>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(user => (
					<UserContainer key={user}>
						<UserContent>
							<UserImage>
								<Image
									src="/images/1.jpg"
									alt="Customer"
									layout="responsive"
									width={1080}
									height={1080}
								/>
							</UserImage>
							<UserInfo>
								<Username>Eric Prima Wijaya</Username>
								<Email>ericpeweh@gmail.com</Email>
							</UserInfo>
						</UserContent>
						<Button size="small" color="primary">
							Pilih
						</Button>
					</UserContainer>
				))}
			</UserOptions>
		</UserPickerModalContainer>
	);
};

export default UserPickerModal;
