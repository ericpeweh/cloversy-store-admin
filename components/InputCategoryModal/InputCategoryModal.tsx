// Dependencies
import React from "react";

// Styles
import {
	InputCategoryModalContainer,
	FormContainer,
	InputContainer,
	InputLimitText,
	ModalTitle
} from "./InputCategoryModal.styles";

// Components
import CloseButton from "../CloseButton/CloseButton";
import TextInput from "../TextInput/TextInput";
import { Divider, Grid } from "@mui/material";
import Button from "../Button/Button";

interface InputCategoryModalProps {
	modalTitle: string;
	open: boolean;
	onClose: () => void;
}

const InputCategoryModal = ({ open, onClose, modalTitle }: InputCategoryModalProps) => {
	return (
		<InputCategoryModalContainer open={open} onClose={onClose}>
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
				<Grid container spacing={{ xs: 2, md: 3 }}>
					<InputContainer item xs={12}>
						<TextInput label="Nama kategori" id="kategori" />
					</InputContainer>
					<InputContainer item xs={12}>
						<TextInput label="Identifier" id="identifier" />
					</InputContainer>
					<InputContainer item xs={12}>
						<TextInput label="Deskripsi" id="deskripsi" multiline rows={4} />
						<InputLimitText>0/50</InputLimitText>
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
		</InputCategoryModalContainer>
	);
};

export default InputCategoryModal;
