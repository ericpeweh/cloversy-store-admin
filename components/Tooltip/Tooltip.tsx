// Dependencies
import React from "react";
import { Zoom } from "@mui/material";

// Styles
import { TooltipContainer } from "./Tooltip.styles";

interface TooltipProps {
	children: React.ReactElement;
	title: string;
}

const Tooltip = ({ children, title }: TooltipProps) => {
	return (
		<TooltipContainer title={title} arrow sx={{ fontSize: "1.6rem" }} TransitionComponent={Zoom}>
			{children}
		</TooltipContainer>
	);
};

export default Tooltip;
