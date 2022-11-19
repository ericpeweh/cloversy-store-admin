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
} from "./UserPickerModal.styles";

// Types
import { Customer } from "../../interfaces";

// Components
import { Divider, Avatar, CircularProgress, Typography, Box } from "@mui/material";
import CloseButton from "../CloseButton/CloseButton";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import InfiniteScroller from "react-infinite-scroll-component";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface UserPickerModalProps {
	open: boolean;
	onClose: () => void;
	searchQuery: string;
	onSearchQueryChange: Function;
	onLoadMore: () => void;
	page: number;
	totalPages: number;
	data: Customer[];
	manualOnSelect?: boolean;
	onSelect: Function;
	selectedData: { id: number; email: string }[];
	isLoading: boolean;
	error: any;
}

const UserPickerModal = ({
	open,
	onClose,
	data,
	onSearchQueryChange,
	page,
	totalPages,
	searchQuery,
	onLoadMore,
	onSelect,
	manualOnSelect = false,
	selectedData,
	isLoading,
	error
}: UserPickerModalProps) => {
	const selectChangeHandler = (
		isSelected: boolean,
		selectedUser: { id: number; email: string }
	) => {
		// Manual handle onSelect
		if (manualOnSelect) {
			return onSelect(isSelected, selectedUser);
		}

		if (isSelected) {
			const updatedSelectedData = selectedData.filter(data => data.id !== selectedUser.id);
			onSelect("selectedUsers", updatedSelectedData);
		} else {
			const updatedSelectedData = [...selectedData, selectedUser];
			onSelect("selectedUsers", updatedSelectedData);
		}
	};

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
				<ModalTitle>Pilih customer</ModalTitle>
				<TextInput
					label=""
					placeholder="Search user..."
					size="small"
					value={searchQuery}
					onChange={onSearchQueryChange}
				/>
			</UserPickerHeader>
			<Divider />
			<Box id="scroller">
				{isLoading && (
					<FallbackContainer>
						<CircularProgress />
					</FallbackContainer>
				)}
				{!isLoading && error && (
					<FallbackContainer>{<ErrorMessage>{error.data.message}</ErrorMessage>}</FallbackContainer>
				)}
				{!isLoading && !error && data.length === 0 && (
					<FallbackContainer>{<Typography>No customer found!</Typography>}</FallbackContainer>
				)}
				<InfiniteScroller
					dataLength={data.length}
					next={onLoadMore}
					hasMore={page < totalPages}
					loader={
						<FallbackContainer size="small">
							<CircularProgress />
						</FallbackContainer>
					}
					scrollableTarget="scroller"
				>
					<UserOptions>
						{!error &&
							data.length > 0 &&
							data.map(user => {
								const isSelected = selectedData.findIndex(item => item.id === user.id) !== -1;

								return (
									<UserContainer key={user.id}>
										<UserContent>
											<UserImage>
												<Avatar
													src={user.profile_image}
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
										<Button
											size="small"
											color={isSelected ? "secondary" : "primary"}
											onClick={() =>
												selectChangeHandler(isSelected, { id: user.id, email: user.email })
											}
										>
											{isSelected ? "Terpilih" : "Pilih"}
										</Button>
									</UserContainer>
								);
							})}
					</UserOptions>
				</InfiniteScroller>
			</Box>
		</UserPickerModalContainer>
	);
};

export default UserPickerModal;
