// Dependencies
import React from "react";
import { ButtonBaseProps, SxProps } from "@mui/material";

// Styles
import { BoxButtonContainer } from "./BoxButton.styles";

interface ButtonProps extends ButtonBaseProps {
	children: React.ReactNode;
	sx?: SxProps;
}

const BoxButton = ({ children, ...props }: ButtonProps) => {
	return <BoxButtonContainer {...props}>{children}</BoxButtonContainer>;
};

export default BoxButton;
