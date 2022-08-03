// Dependencies
import React from "react";

// Styles
import { StatusBadgeContainer } from "./StatusBadge.styles";

interface StatusBadgeProps {
	children: string | React.ReactElement | React.ReactElement[];
	color?: string;
	centerText?: boolean;
}

const StatusBadge = ({ children, centerText = false, color = "primary" }: StatusBadgeProps) => {
	return (
		<StatusBadgeContainer color={color} centerText={centerText}>
			{children}
		</StatusBadgeContainer>
	);
};

export default StatusBadge;
