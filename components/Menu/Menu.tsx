// Dependencies
import React from "react";

// Components
import { MenuItem } from "@mui/material";

// Styles
import { MenuContainer } from "./Menu.styles";

interface MenuItemProps {
	label: string | React.ReactElement;
	id: string;
	action: () => void;
}

interface MenuProps {
	items: MenuItemProps[];
	isOpen: boolean;
	anchorEl: null | HTMLElement;
	onClose: () => void;
	id: string;
}

const Menu = ({ items, isOpen, anchorEl, onClose, id }: MenuProps) => {
	const menuItemClickHandler = (action: Function) => {
		action();
		onClose();
	};

	return (
		<MenuContainer
			id={id}
			anchorEl={anchorEl}
			open={isOpen}
			onClose={onClose}
			MenuListProps={{
				"aria-labelledby": id
			}}
		>
			{items.map(item => (
				<MenuItem
					key={item.id}
					onClick={() => menuItemClickHandler(item.action)}
					sx={{ color: item.id === "hapus" ? "error.main" : "secondary.main" }}
				>
					{item.label}
				</MenuItem>
			))}
		</MenuContainer>
	);
};

export default Menu;
