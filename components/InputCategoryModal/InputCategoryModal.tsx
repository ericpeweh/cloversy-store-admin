// Dependencies
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// Styles
import {
	InputCategoryModalContainer,
	FormContainer,
	InputContainer,
	InputLimitText,
	ModalTitle
} from "./InputCategoryModal.styles";

// Types
import { Category } from "../../interfaces";

// Components
import { Alert, Divider, Grid } from "@mui/material";
import CloseButton from "../CloseButton/CloseButton";
import TextInput from "../TextInput/TextInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../Button/Button";

interface InputCategoryModalProps {
	modalTitle: string;
	open: boolean;
	isLoading?: boolean;
	categoryData?: Category;
	onClose: () => void;
	onSubmit: Function;
	error?: any;
}

interface InputCategoryFormValues {
	name: string;
	identifier: string;
	description: string;
}

const CreateCategorySchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	identifier: Yup.string().required("Required")
});

const InputCategoryModal = ({
	open,
	onClose,
	modalTitle,
	onSubmit,
	isLoading,
	categoryData,
	error
}: InputCategoryModalProps) => {
	const formInitialValues: InputCategoryFormValues = {
		name: categoryData?.name ?? "",
		identifier: categoryData?.identifier ?? "",
		description: categoryData?.description ?? ""
	};

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
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateCategorySchema}
				onSubmit={values => {
					onSubmit(categoryData ? { id: categoryData.id, ...values } : values);
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
					<FormContainer onSubmit={handleSubmit}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							<InputContainer item xs={12}>
								<TextInput
									label="Nama kategori"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.name && touched.name)}
								/>
								{errors.name && touched.name && <ErrorMessage>{errors.name}</ErrorMessage>}
							</InputContainer>
							<InputContainer item xs={12}>
								<TextInput
									label="Identifier"
									name="identifier"
									value={values.identifier}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.identifier && touched.identifier)}
								/>
								{errors.identifier && touched.identifier && (
									<ErrorMessage>{errors.identifier}</ErrorMessage>
								)}
							</InputContainer>
							<InputContainer item xs={12}>
								<TextInput
									label="Deskripsi"
									multiline
									rows={4}
									name="description"
									value={values.description}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										const description = e.target.value;
										if (description.length > 50) {
											return;
										}
										handleChange(e);
									}}
									onBlur={handleBlur}
								/>
								<InputLimitText>{values.description.length}/200</InputLimitText>
							</InputContainer>
							<Grid item xs={12}>
								{error && (
									<Alert severity="error" sx={{ mt: 2 }}>
										{error?.data?.message || "Error occured while processing category data."}
									</Alert>
								)}
								<InputContainer item xs={3} alignSelf="flex-end" ml="auto">
									<Button
										color="primary"
										fullWidth
										type="submit"
										disabled={!isValid}
										loading={isLoading}
									>
										Simpan
									</Button>
								</InputContainer>
							</Grid>
						</Grid>
					</FormContainer>
				)}
			</Formik>
		</InputCategoryModalContainer>
	);
};

export default InputCategoryModal;
