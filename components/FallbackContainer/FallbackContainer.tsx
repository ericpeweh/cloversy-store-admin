// Dependencies
import React from "react";

// Components
import { Stack } from "@mui/material";

interface FallbackContainerProps {
	children: React.ReactNode;
	size?: "small" | "medium";
}

const FallbackContainer = ({ children, size = "medium" }: FallbackContainerProps) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={{ height: size === "medium" ? "20rem" : "13rem" }}
			gap={2}
		>
			{children}
		</Stack>
	);
};

export default FallbackContainer;
