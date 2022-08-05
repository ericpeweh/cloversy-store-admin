// Dependencies
import React from "react";
import { SxProps } from "@mui/material";

// Styles
import { StatusBadgeContainer } from "./StatusBadge.styles";

interface StatusBadgeProps {
	children: string | React.ReactElement | React.ReactElement[];
	color?: string;
	centerText?: boolean;
	sx?: SxProps;
}

const StatusBadge = ({
	children,
	centerText = false,
	color = "primary",
	...props
}: StatusBadgeProps) => {
	return (
		<StatusBadgeContainer color={color} centerText={centerText} {...props}>
			{children}
		</StatusBadgeContainer>
	);
};

export default StatusBadge;
