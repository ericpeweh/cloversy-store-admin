// Dependencies
import { useState } from "react";

const useMenu = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [menuAnchorElData, setMenuAnchorElData] = useState<any>(null);
	const isMenuOpen = Boolean(menuAnchorEl);

	const openMenuHandler = (event: React.MouseEvent<HTMLButtonElement>, data?: any) => {
		if (data) setMenuAnchorElData(data);
		setMenuAnchorEl(event.currentTarget);
	};

	const closeMenuHandler = () => {
		setMenuAnchorEl(null);
	};

	return {
		isMenuOpen,
		openHandler: openMenuHandler,
		closeHandler: closeMenuHandler,
		anchorEl: menuAnchorEl,
		anchorElData: menuAnchorElData
	};
};

export default useMenu;
