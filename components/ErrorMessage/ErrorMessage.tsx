// Dependencies
import { SxProps, Typography } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
	children: React.ReactNode;
	sx?: SxProps;
}

const ErrorMessage = ({ children, ...props }: ErrorMessageProps) => {
	return (
		<Typography
			color="red"
			fontSize="1.6rem"
			mt={0.5}
			mb={1}
			{...props}
			sx={{
				"&:first-letter": {
					textTransform: "uppercase"
				}
			}}
		>
			{children}
		</Typography>
	);
};

export default ErrorMessage;
