// Dependencies
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import Button from "../Button/Button";

// Styles
import { ConfirmationModalContainer } from "./ConfirmationModal.styles";

type ColorType =
	| "primary"
	| "inherit"
	| "secondary"
	| "success"
	| "error"
	| "info"
	| "warning"
	| undefined;

interface ConfirmationModalProps {
	modalTitle: string;
	modalDescription: string;
	open: boolean;
	onClose: () => void;
	cancelText?: string;
	confirmText?: string;
	cancelColor?: ColorType;
	confirmColor?: ColorType;
}

const ConfirmationModal = ({
	open,
	onClose,
	modalTitle,
	modalDescription,
	cancelText = "Batal",
	confirmText = "Hapus",
	cancelColor = "primary",
	confirmColor = "primary"
}: ConfirmationModalProps) => {
	return (
		<ConfirmationModalContainer open={open} onClose={onClose}>
			<DialogTitle>{modalTitle}</DialogTitle>
			<DialogContent>
				<DialogContentText>{modalDescription}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="outlined" color={cancelColor} size="small">
					{cancelText}
				</Button>
				<Button onClick={() => {}} color={confirmColor} size="small">
					{confirmText}
				</Button>
			</DialogActions>
		</ConfirmationModalContainer>
	);
};

export default ConfirmationModal;
