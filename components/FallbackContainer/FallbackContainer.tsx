// Dependencies
import React from "react";

// Components
import { Stack } from "@mui/material";

interface FallbackContainerProps {
	children: React.ReactNode;
}

const FallbackContainer = ({ children }: FallbackContainerProps) => {
	return (
		<Stack justifyContent="center" alignItems="center" sx={{ height: "20rem" }}>
			{children}
		</Stack>
	);
};

export default FallbackContainer;
