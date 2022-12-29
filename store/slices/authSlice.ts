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
	contact: string | null;
	birth_date: string | null;
	status: string;
	user_role: string;
}

const initialState: AuthState = {
	isAuth: false,
	token: "",
	full_name: "",
	email: "",
	profile_picture: "",
	email_verified: false,
	contact: "",
	birth_date: "",
	status: "idle",
	user_role: ""
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (
			state,
			{
				payload: {
					isAuth,
					token,
					full_name,
					email,
					profile_picture,
					email_verified,
					contact,
					birth_date,
					status,
					user_role
				}
			}: PayloadAction<AuthState>
		) => {
			state.isAuth = isAuth;
			state.token = token;
			state.full_name = full_name;
			state.email = email;
			state.profile_picture = profile_picture;
			state.email_verified = email_verified;
			state.contact = contact;
			state.birth_date = birth_date;
			state.status = status;
			state.user_role = user_role;
		},
		setAuthStatus: (state, { payload }: PayloadAction<string>) => {
			state.status = payload;
		},
		setUserProfilePicture: (
			state,
			{ payload: { profile_picture } }: PayloadAction<{ profile_picture: string }>
		) => {
			state.profile_picture = profile_picture;
		}
	}
});

export const { setCredentials, setAuthStatus, setUserProfilePicture } = authSlice.actions;

export default authSlice.reducer;
