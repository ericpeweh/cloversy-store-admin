// Dependencies
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// Styles
import {
	InputBrandModalContainer,
	FormContainer,
	InputContainer,
	ModalTitle
} from "./InputBrandModal.styles";

// Types
import { Brand } from "../../interfaces";

// Components
import CloseButton from "../CloseButton/CloseButton";
import TextInput from "../TextInput/TextInput";
import { Divider, Grid } from "@mui/material";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface InputdBrandModalProps {
	modalTitle: string;
	open: boolean;
	isLoading?: boolean;
	brandData?: Brand;
	onClose: () => void;
	onSubmit: Function;
}

interface InputBrandFormValues {
	name: string;
	identifier: string;
}

const CreateBrandSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	identifier: Yup.string().required("Required")
});

const InputdBrandModal = ({
	open,
	onClose,
	modalTitle,
	onSubmit,
	isLoading,
	brandData
}: InputdBrandModalProps) => {
	const formInitialValues: InputBrandFormValues = {
		name: brandData?.name ?? "",
		identifier: brandData?.identifier ?? ""
	};

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
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateBrandSchema}
				onSubmit={values => {
					onSubmit(brandData ? { id: brandData.id, ...values } : values);
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
					<FormContainer onSubmit={handleSubmit}>
						<Grid container spacing={{ xs: 2, sm: 3 }}>
							<InputContainer item xs={12}>
								<TextInput
									label="Nama brand"
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
							<Grid item xs={12}>
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
		</InputBrandModalContainer>
	);
};

export default InputdBrandModal;
