// Dependencies
import React from "react";
import { ButtonProps as MuiButtonProps } from "@mui/material";

// Styles
import { CustomButton } from "./Button.styles";

interface ButtonProps extends MuiButtonProps {
	children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<CustomButton color="secondary" variant="contained" {...{ size: "large", ...props }}>
			{children}
		</CustomButton>
	);
};

export default Button;
