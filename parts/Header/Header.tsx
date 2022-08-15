// Dependencies
import React from "react";
import { grey } from "@mui/material/colors";

// Styles
import { HeaderContainer, Username } from "./Header.styles";

// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Hooks
import useMenu from "../../hooks/useMenu";

// Components
import { Avatar, ButtonBase, IconButton, MenuItem, Stack } from "@mui/material";
import Menu from "../../components/Menu/Menu";
import NotificationDrawer from "../../components/NotificationDrawer/NotificationDrawer";
import useModal from "../../hooks/useModal";

const Header = () => {
	const {
		isMenuOpen: isAccountMenuOpen,
		openHandler: openAccountMenuHandler,
		closeHandler: closeAccountMenuHandler,
		anchorEl: accountMenuAnchorEl
	} = useMenu();

	const {
		isOpen: isNotificationModalOpen,
		openHandler: notificationModalOpenHandler,
		closeHandler: notificationModalCloseHandler
	} = useModal();

	return (
		<HeaderContainer>
			<NotificationDrawer open={isNotificationModalOpen} onClose={notificationModalCloseHandler} />
			<Stack direction="row" alignItems="center" gap={2}>
				<IconButton onClick={notificationModalOpenHandler}>
					<NotificationsActiveIcon sx={{ color: grey[400] }} />
				</IconButton>
				<Username>Mikici Cimol</Username>
				<ButtonBase sx={{ borderRadius: "0.5rem", p: "0.5rem" }} onClick={openAccountMenuHandler}>
					<Avatar src="/images/1.jpg" alt="user profile" />
					<ArrowDropDownIcon />
				</ButtonBase>
			</Stack>
			<Menu
				id="account-menu"
				isOpen={isAccountMenuOpen}
				items={[
					{ label: "Profil saya", action: () => {}, id: "profil" },
					{ label: "Logout", action: () => {}, id: "logout" }
				]}
				anchorEl={accountMenuAnchorEl}
				onClose={closeAccountMenuHandler}
			/>
		</HeaderContainer>
	);
};

export default Header;
