// Dependencies
import React from "react";
import { SxProps } from "@mui/material";

// Styles
import { CloseButtonContainer } from "./CloseButton.styles";

// Icons
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
	sx: SxProps;
	onClick: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
	return (
		<CloseButtonContainer {...props}>
			<CloseIcon />
		</CloseButtonContainer>
	);
};

export default CloseButton;
