// Dependencies
import React from "react";

// Styles
import {
	InputBrandModalContainer,
	FormContainer,
	InputContainer,
	ModalTitle
} from "./InputBrandModal.styles";

// Components
import CloseButton from "../CloseButton/CloseButton";
import TextInput from "../TextInput/TextInput";
import { Divider, Grid } from "@mui/material";
import Button from "../Button/Button";

interface InputdBrandModalProps {
	modalTitle: string;
	open: boolean;
	onClose: () => void;
}

const InputdBrandModal = ({ open, onClose, modalTitle }: InputdBrandModalProps) => {
	return (
		<InputBrandModalContainer open={open} onClose={onClose}>
			<CloseButton
				onClick={onClose}
				sx={{
					top: { xs: "1.5rem", sm: "2.5rem" },
					right: { xs: "2rem", sm: "3rem" },
					width: "3rem",
					height: "3rem"
				}}
			/>
			<ModalTitle>{modalTitle}</ModalTitle>
			<Divider />
			<FormContainer>
				<Grid container spacing={{ xs: 2, sm: 3 }}>
					<InputContainer item xs={12}>
						<TextInput label="Nama brand" id="brand" />
					</InputContainer>
					<InputContainer item xs={12}>
						<TextInput label="Identifier" id="identifier" />
					</InputContainer>
					<Grid item xs={12}>
						<InputContainer item xs={3} alignSelf="flex-end" ml="auto">
							<Button color="primary" fullWidth>
								Simpan
							</Button>
						</InputContainer>
					</Grid>
				</Grid>
			</FormContainer>
		</InputBrandModalContainer>
	);
};

export default InputdBrandModal;
