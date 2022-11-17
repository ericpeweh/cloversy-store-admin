// Dependencies
import { Typography } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
	children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
	return (
		<Typography color="red" fontSize="1.6rem" mt={0.5} mb={1}>
			{children}
		</Typography>
	);
};

export default ErrorMessage;
