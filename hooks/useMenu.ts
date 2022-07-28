// Dependencies
import { useState } from "react";

const useMenu = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(menuAnchorEl);

	const openMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const closeMenuHandler = () => {
		setMenuAnchorEl(null);
	};

	return {
		isMenuOpen,
		openHandler: openMenuHandler,
		closeHandler: closeMenuHandler,
		anchorEl: menuAnchorEl
	};
};

export default useMenu;
