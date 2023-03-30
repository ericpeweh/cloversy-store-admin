// Dependencies
import React from "react";
import { LoadingButtonProps as MuiLoadingButtonProps } from "@mui/lab";

// Styles
import { CustomButton } from "./Button.styles";

interface ButtonProps extends MuiLoadingButtonProps {
	children: React.ReactNode;
	component?: any;
}

const Button = ({ children, component, ...props }: ButtonProps) => {
	return (
		<CustomButton color="secondary" variant="contained" {...{ size: "large", component, ...props }}>
			{children}
		</CustomButton>
	);
};

export default Button;
