// Dependencies
import React from "react";

// Components
import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingScreenProps {
	isOpen: boolean;
}

const LoadingScreen = ({ isOpen = false }: LoadingScreenProps) => {
	return (
		<Backdrop sx={{ backgroundColor: "#fff", color: "#fff", zIndex: 10000 }} open={isOpen}>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};

export default LoadingScreen;
