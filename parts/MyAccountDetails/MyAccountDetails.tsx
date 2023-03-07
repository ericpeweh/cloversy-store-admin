// Dependencies
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import { shallowEqual } from "react-redux";
import useDispatch from "../../hooks/useDispatch";

// Styles
import {
	FormContainer,
	InputContainer,
	MyAccountDetailsContainer,
	ProfilePictureInputContainer,
	SectionTitle,
	UserEmail
} from "./MyAccountDetails.styles";

// Icons
import VerifiedIcon from "@mui/icons-material/Verified";

// Hooks
import useSelector from "../../hooks/useSelector";
import {
	useUpdateAccountDetailsMutation,
	useUpdateProfilePictureMutation,
	useDeleteProfilePictureMutation,
	useResetPasswordMutation
} from "../../api/account.api";

// Actions
import { setUserDetails, setUserProfilePicture } from "../../store/slices/authSlice";

// Types
import type { DateTime as DateTimeType } from "luxon";
import { UpdateAccountDetailsBody } from "../../interfaces";

// Utils
import compressImage from "../../utils/compressImage";

// Components
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Avatar, Chip, Grid, Alert } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

interface EditAccountDetailsFormValues {
	full_name: string;
	contact: string;
	birth_date: DateTimeType;
}

const EditAccountDetailsSchema = Yup.object().shape({
	full_name: Yup.string().required("Nama lengkap dibutuhkan"),
	contact: Yup.string()
		.matches(/^08\d{8,11}$/g, "Nomor kontak tidak valid")
		.required("Kontak dibutuhkan")
});

const MyAccountDetails = () => {
	const dispatch = useDispatch();
	const fileInputElRef = useRef<HTMLInputElement>(null);
	const [successResetPassword, setSuccessResetPassword] = useState(false);
	const { email, email_verified, full_name, profile_picture, birth_date, contact } = useSelector(
		state => state.auth,
		shallowEqual
	);

	const formInitialValues: EditAccountDetailsFormValues = {
		full_name,
		contact: contact ?? "",
		birth_date: birth_date ? DateTime.fromISO(birth_date) : DateTime.now()
	};

	const [
		updateAccountDetails,
		{
			data: updateAccountDetailsData,
			isLoading: isUpdateAccountDetailsLoading,
			error: updateAccountDetailsErrorData,
			isSuccess: isUpdateAccountDetailsSuccess,
			reset: resetUpdateAccountDetails
		}
	] = useUpdateAccountDetailsMutation();
	const updateAccountDetailsError: any = updateAccountDetailsErrorData;

	const [
		updateProfilePicture,
		{
			data: updateProfilePictureData,
			isLoading: isUpdateProfilePictureLoading,
			error: updateProfilePictureErrorData,
			isSuccess: isUpdateProfilePictureSuccess,
			reset: resetUpdateProfilePicture
		}
	] = useUpdateProfilePictureMutation();
	const updateProfilePictureError: any = updateProfilePictureErrorData;

	const [
		resetPassword,
		{
			isLoading: isResetPasswordLoading,
			error: resetPasswordErrorData,
			isSuccess: isResetPasswordSuccess,
			reset: resetResetPassword
		}
	] = useResetPasswordMutation();
	const resetPasswordError: any = resetPasswordErrorData;

	const [
		deleteProfilePicture,
		{
			data: deleteProfilePictureData,
			isLoading: isDeleteProfilePictureLoading,
			error: deleteProfilePictureErrorData,
			isSuccess: isDeleteProfilePictureSuccess,
			reset: resetDeleteProfilePicture
		}
	] = useDeleteProfilePictureMutation();
	const deleteProfilePictureError: any = deleteProfilePictureErrorData;

	useEffect(() => {
		if (isUpdateAccountDetailsSuccess && updateAccountDetailsData) {
			const userData = updateAccountDetailsData?.data?.updatedAccountDetails;
			dispatch(
				setUserDetails({
					full_name: userData.full_name || "",
					contact: userData.contact || "",
					birth_date: userData.birth_date || ""
				})
			);
			resetUpdateAccountDetails();
		}
	}, [
		isUpdateAccountDetailsSuccess,
		resetUpdateAccountDetails,
		updateAccountDetailsData,
		dispatch
	]);

	useEffect(() => {
		if (isUpdateProfilePictureSuccess && updateProfilePictureData) {
			const userData = updateProfilePictureData?.data?.updatedAccountDetails;

			if (userData.profile_picture) {
				dispatch(
					setUserProfilePicture({
						profile_picture: userData.profile_picture
					})
				);
				resetUpdateProfilePicture();
			}

			if (fileInputElRef.current !== null) {
				fileInputElRef.current.value = "";
			}
		}
	}, [
		isUpdateProfilePictureSuccess,
		resetUpdateProfilePicture,
		updateProfilePictureData,
		dispatch
	]);

	useEffect(() => {
		if (isDeleteProfilePictureSuccess && deleteProfilePictureData) {
			const userData = deleteProfilePictureData?.data?.updatedAccountDetails;

			dispatch(
				setUserProfilePicture({
					profile_picture: userData.profile_picture || ""
				})
			);
			resetDeleteProfilePicture();

			if (fileInputElRef.current !== null) {
				fileInputElRef.current.value = "";
			}
		}
	}, [
		isDeleteProfilePictureSuccess,
		resetDeleteProfilePicture,
		deleteProfilePictureData,
		dispatch
	]);

	useEffect(() => {
		if (isResetPasswordSuccess) {
			resetResetPassword();
			setSuccessResetPassword(true);
		}
	}, [isResetPasswordSuccess, resetResetPassword]);

	const updateAccountDetailsHandler = (data: UpdateAccountDetailsBody) =>
		updateAccountDetails(data);

	const updateProfilePictureHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files && files.length > 0) {
			const newProfilePicture = new FormData();

			await compressImage(files[0]).then((result: File) =>
				newProfilePicture.append("image", result)
			);

			updateProfilePicture(newProfilePicture);
		}
	};

	const deleteProfilePictureHandler = async () => {
		deleteProfilePicture();
	};

	const resetPasswordHandler = async () => {
		setSuccessResetPassword(false);
		resetPassword();
	};

	return (
		<MyAccountDetailsContainer>
			<FormContainer>
				<Grid container spacing={2} width={{ xs: "100%", md: "90%", lg: "80%", xl: "70%" }}>
					<Grid item xs={12}>
						<SectionTitle>Foto Profil</SectionTitle>
					</Grid>
					<Grid item xs={12}>
						<InputContainer>
							<ProfilePictureInputContainer>
								<Avatar
									sx={{
										width: { xs: 55, sm: 65, md: 75 },
										height: { xs: 55, sm: 65, md: 75 },
										border: "1px solid #999"
									}}
									src={profile_picture}
								/>
								<Button
									size="small"
									variant="outlined"
									component={"label"}
									loading={isUpdateProfilePictureLoading}
								>
									Ganti foto profil
									<input
										type="file"
										accept="image/*"
										hidden
										onChange={updateProfilePictureHandler}
										ref={fileInputElRef}
									/>
								</Button>
								<Button
									size="small"
									variant="outlined"
									color="error"
									onClick={deleteProfilePictureHandler}
									loading={isDeleteProfilePictureLoading}
								>
									Hapus foto
								</Button>
							</ProfilePictureInputContainer>
							{updateProfilePictureError && (
								<ErrorMessage>{updateProfilePictureError?.data?.message}</ErrorMessage>
							)}
							{deleteProfilePictureError && (
								<ErrorMessage>{deleteProfilePictureError?.data?.message}</ErrorMessage>
							)}
						</InputContainer>
					</Grid>
					<Grid item xs={12}>
						<SectionTitle>Informasi Akun</SectionTitle>
					</Grid>
					<Formik
						initialValues={formInitialValues}
						validationSchema={EditAccountDetailsSchema}
						enableReinitialize={true}
						onSubmit={({ birth_date, contact, full_name }) => {
							updateAccountDetailsHandler({
								contact: contact!,
								full_name: full_name!,
								birth_date: birth_date.toISO().slice(0, 23)
							});
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue
						}) => (
							<>
								<Grid item xs={12}>
									<UserEmail sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
										Email: {email}{" "}
										<Chip
											icon={<VerifiedIcon />}
											size="small"
											color={email_verified ? "success" : "default"}
											label={email_verified ? "TERVERIFIKASI" : "BELUM VERIFIKASI"}
										/>
									</UserEmail>
								</Grid>
								<Grid item xs={12}>
									<InputContainer>
										<TextInput
											label="Nama Lengkap"
											name="full_name"
											value={values.full_name}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(errors.full_name && touched.full_name)}
										/>
									</InputContainer>
									{errors.full_name && touched.full_name && (
										<ErrorMessage>{errors.full_name}</ErrorMessage>
									)}
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputContainer>
										<TextInput
											label="Kontak"
											type="tel"
											name="contact"
											placeholder="081234567890"
											value={values.contact!}
											onChange={handleChange}
											onBlur={handleBlur}
											error={Boolean(errors.contact && touched.contact)}
										/>
									</InputContainer>
									{errors.contact && touched.contact && (
										<ErrorMessage>{errors.contact}</ErrorMessage>
									)}
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputContainer>
										<DatePicker
											label="Tanggal Lahir"
											value={values.birth_date!}
											onChange={(value: Date) => setFieldValue("birth_date", value)}
										/>
									</InputContainer>
								</Grid>
								{updateAccountDetailsError && (
									<ErrorMessage>{updateAccountDetailsError.data.message}</ErrorMessage>
								)}
								<Grid item xs={12}>
									<Grid item mt={1} xs={6} sm={3}>
										<Button
											color="primary"
											fullWidth
											size="small"
											onClick={() => handleSubmit()}
											loading={isUpdateAccountDetailsLoading}
										>
											Simpan Perubahan
										</Button>
									</Grid>
								</Grid>
							</>
						)}
					</Formik>
				</Grid>
			</FormContainer>
			<FormContainer>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<SectionTitle>Ganti Kata Sandi</SectionTitle>
					</Grid>
					<Grid item xs={12}>
						<Grid item mt={1} xs={6} sm={3}>
							<Button
								fullWidth
								size="small"
								onClick={resetPasswordHandler}
								loading={isResetPasswordLoading}
							>
								Reset Password
							</Button>
						</Grid>
						{successResetPassword && (
							<Alert
								onClose={() => setSuccessResetPassword(false)}
								sx={{ mt: 2, maxWidth: { xs: "100%", md: "90%", lg: "80%", xl: "70%" } }}
							>
								{"Kami baru saja mengirimkan email untuk mengatur ulang kata sandi Anda."}
							</Alert>
						)}
						{resetPasswordError && <ErrorMessage>{resetPasswordError.data.message}</ErrorMessage>}
					</Grid>
				</Grid>
			</FormContainer>
		</MyAccountDetailsContainer>
	);
};

export default MyAccountDetails;
