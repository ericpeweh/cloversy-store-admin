// Dependencies
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";
import { useAuth0 } from "@auth0/auth0-react";

// Styles
import { HeaderContainer, Username } from "./Header.styles";

// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";

// Actions
import { toggleShowSidebar } from "../../store/slices/globalSlice";

// Hooks
import useMenu from "../../hooks/useMenu";

// Components
import { Avatar, ButtonBase, IconButton, Stack } from "@mui/material";
import Menu from "../../components/Menu/Menu";
import NotificationDrawer from "../../components/NotificationDrawer/NotificationDrawer";
import useModal from "../../hooks/useModal";
import Button from "../../components/Button/Button";

const Header = () => {
	const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

	console.log(user);

	useEffect(() => {
		const getToken = async () => {
			const token = await getAccessTokenSilently();
			console.log(token);
		};
		getToken();
	}, []);

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

	const dispatch = useDispatch();

	const toggleSidebarHandler = () => {
		dispatch(toggleShowSidebar());
	};

	return (
		<HeaderContainer>
			<NotificationDrawer open={isNotificationModalOpen} onClose={notificationModalCloseHandler} />
			<Stack
				direction="row"
				alignItems="center"
				gap={{ xs: 1, sm: 2 }}
				sx={{ flex: 1, justifyContent: { md: "space-between", lg: "flex-end" } }}
			>
				<IconButton
					aria-label="mobile-menu"
					onClick={toggleSidebarHandler}
					sx={{
						mr: "auto",
						display: {
							md: "flex",
							lg: "none"
						}
					}}
				>
					<MenuIcon
						sx={{
							fontSize: { xs: 25, sm: 30 }
						}}
					/>
				</IconButton>
				{!isAuthenticated && (
					<Button size="small" color="primary" onClick={() => loginWithRedirect()}>
						Log In
					</Button>
				)}
				{isAuthenticated && (
					<>
						<Button size="small" onClick={() => logout({ returnTo: "http://localhost:3000/" })}>
							Log out
						</Button>
						<IconButton onClick={notificationModalOpenHandler}>
							<NotificationsActiveIcon
								sx={{ color: grey[400], fontSize: { xs: 20, md: 25, lg: 30 } }}
							/>
						</IconButton>
						<Username>{user?.name}</Username>
						<ButtonBase
							sx={{ borderRadius: "0.5rem", p: "0.5rem" }}
							onClick={openAccountMenuHandler}
						>
							<Avatar
								src={`${user?.picture}` || "/images/1.jpg"}
								alt="user profile"
								sx={{
									width: { xs: "3rem", sm: "4rem", md: "5rem" },
									height: { xs: "3rem", sm: "4rem", md: "5rem" }
								}}
							/>
							<ArrowDropDownIcon />
						</ButtonBase>
					</>
				)}
			</Stack>
			{isAuthenticated && (
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
			)}
		</HeaderContainer>
	);
};

export default Header;
