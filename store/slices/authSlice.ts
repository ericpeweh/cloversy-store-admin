// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuth: boolean;
	token: string;
	full_name: string;
	email: string;
	profile_picture: string;
	email_verified: boolean;
}

const initialState: AuthState = {
	isAuth: false,
	token: "",
	full_name: "",
	email: "",
	profile_picture: "",
	email_verified: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (
			state,
			{
				payload: { isAuth, token, full_name, email, profile_picture, email_verified }
			}: PayloadAction<AuthState>
		) => {
			state.isAuth = isAuth;
			state.token = token;
			state.full_name = full_name;
			state.email = email;
			state.profile_picture = profile_picture;
			state.email_verified = email_verified;
		}
	}
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
