// Dependencies
import React from "react";
import { ButtonBaseProps, SxProps } from "@mui/material";

// Styles
import { BoxButtonContainer } from "./BoxButton.styles";

// Components
import { CircularProgress } from "@mui/material";

interface ButtonProps extends ButtonBaseProps {
	children: React.ReactNode;
	loading?: boolean;
	sx?: SxProps;
}

const BoxButton = ({ children, loading, ...props }: ButtonProps) => {
	return (
		<BoxButtonContainer {...props} disabled={loading}>
			{loading ? <CircularProgress size={20} color="secondary" /> : children}
		</BoxButtonContainer>
	);
};

export default BoxButton;
