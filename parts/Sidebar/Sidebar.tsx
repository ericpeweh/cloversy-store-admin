// Dependencies
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDispatch, shallowEqual } from "react-redux";

// Styles
import {
	LogoContainer,
	NavList,
	SidebarBackdrop,
	SidebarContainer,
	SidebarHeader,
	SidebarItemChild,
	ItemText
} from "./Sidebar.styles";

// Actions
import { toggleShowSidebar } from "../../store/slices/globalSlice";

// Hooks
import useSelector from "../../hooks/useSelector";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import StarsIcon from "@mui/icons-material/Stars";
import ChatIcon from "@mui/icons-material/Chat";
import DiscountIcon from "@mui/icons-material/Discount";
import TuneIcon from "@mui/icons-material/Tune";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Utils
import { disableScroll, enableScroll } from "../../utils/manipulateScrollbar";

// Components
import { Collapse, Divider, List, ListItemButton, ListItemIcon } from "@mui/material";

const listItemIconProps = {
	sx: {
		fontSize: { xs: "2rem", sm: "2.3rem", lg: "2.6rem" }
	}
};

const Sidebar = () => {
	const [showProductMenu, setShowProductMenu] = useState(false);
	const [showOrdersMenu, setShowOrdersMenu] = useState(false);
	const { showSidebar } = useSelector(state => state.global, shallowEqual);

	const dispatch = useDispatch();

	const toggleSidebarHandler = () => {
		dispatch(toggleShowSidebar());
	};

	const detectCloseModalEvents = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				enableScroll();
				window.removeEventListener("keydown", detectCloseModalEvents);
				dispatch(toggleShowSidebar());
			}
		},
		[dispatch]
	);

	const resetScroll = useCallback(() => {
		enableScroll();
		window.removeEventListener("keydown", detectCloseModalEvents);
	}, [detectCloseModalEvents]);

	useEffect(() => {
		if (showSidebar) {
			window.addEventListener("keydown", detectCloseModalEvents);
			return disableScroll();
		}

		resetScroll();

		return () => {
			resetScroll();
		};
	}, [detectCloseModalEvents, resetScroll, showSidebar]);

	return (
		<>
			<SidebarContainer showSidebar={showSidebar}>
				<SidebarHeader>
					<LogoContainer>
						<Image
							src="/images/logo.png"
							alt="Cloversy logo"
							layout="responsive"
							height={80}
							width={200}
						/>
					</LogoContainer>
				</SidebarHeader>
				<Divider flexItem />
				<NavList>
					<ListItemButton>
						<ListItemIcon>
							<DashboardIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Dashboard" />
					</ListItemButton>
					<ListItemButton onClick={() => setShowProductMenu(prev => !prev)}>
						<ListItemIcon>
							<InventoryIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Products" />
						{showProductMenu ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={showProductMenu} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<SidebarItemChild>
								<ItemText primary="Add product" />
							</SidebarItemChild>
							<SidebarItemChild>
								<ItemText primary="Product list" />
							</SidebarItemChild>
							<SidebarItemChild>
								<ItemText primary="Categories" />
							</SidebarItemChild>
							<SidebarItemChild>
								<ItemText primary="Brands" />
							</SidebarItemChild>
						</List>
					</Collapse>
					<ListItemButton onClick={() => setShowOrdersMenu(prev => !prev)}>
						<ListItemIcon>
							<ShoppingCartIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Orders" />
						{showOrdersMenu ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={showOrdersMenu} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<SidebarItemChild>
								<ItemText primary="Add order" />
							</SidebarItemChild>
							<SidebarItemChild>
								<ItemText primary="Order List" />
							</SidebarItemChild>
						</List>
					</Collapse>
					<ListItemButton>
						<ListItemIcon>
							<GroupIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Customers" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<StarsIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Reviews" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<DiscountIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Voucher" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<ChatIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Chatting" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<CircleNotificationsIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Notifications Center" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<TuneIcon {...listItemIconProps} />
						</ListItemIcon>
						<ItemText primary="Control Panel" />
					</ListItemButton>
				</NavList>
			</SidebarContainer>
			<SidebarBackdrop onClick={toggleSidebarHandler} showSidebar={showSidebar} />
		</>
	);
};

export default Sidebar;
