// Dependencies
import React, { useState } from "react";
import Image from "next/image";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// Styles
import {
	LogoContainer,
	NavList,
	SidebarContainer,
	SidebarHeader,
	SidebarItemChild
} from "./Sidebar.styles";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import StarsIcon from "@mui/icons-material/Stars";
import ChatIcon from "@mui/icons-material/Chat";
import DiscountIcon from "@mui/icons-material/Discount";
import TuneIcon from "@mui/icons-material/Tune";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
	const [showProductMenu, setShowProductMenu] = useState(false);
	const [showOrdersMenu, setShowOrdersMenu] = useState(false);

	return (
		<SidebarContainer>
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
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItemButton>
				<ListItemButton onClick={() => setShowProductMenu(prev => !prev)}>
					<ListItemIcon>
						<InventoryIcon />
					</ListItemIcon>
					<ListItemText primary="Products" />
					{showProductMenu ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={showProductMenu} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<SidebarItemChild>
							<ListItemText primary="Add product" />
						</SidebarItemChild>
						<SidebarItemChild>
							<ListItemText primary="Product list" />
						</SidebarItemChild>
						<SidebarItemChild>
							<ListItemText primary="Categories" />
						</SidebarItemChild>
						<SidebarItemChild>
							<ListItemText primary="Brands" />
						</SidebarItemChild>
					</List>
				</Collapse>
				<ListItemButton onClick={() => setShowOrdersMenu(prev => !prev)}>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Orders" />
					{showOrdersMenu ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={showOrdersMenu} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<SidebarItemChild>
							<ListItemText primary="Add order" />
						</SidebarItemChild>
						<SidebarItemChild>
							<ListItemText primary="Order List" />
						</SidebarItemChild>
					</List>
				</Collapse>
				<ListItemButton>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary="Customers" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<StarsIcon />
					</ListItemIcon>
					<ListItemText primary="Reviews" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<DiscountIcon />
					</ListItemIcon>
					<ListItemText primary="Voucher" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<ChatIcon />
					</ListItemIcon>
					<ListItemText primary="Chatting" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<TuneIcon />
					</ListItemIcon>
					<ListItemText primary="Control Panel" />
				</ListItemButton>
			</NavList>
		</SidebarContainer>
	);
};

export default Sidebar;
