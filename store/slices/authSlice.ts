// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuth: boolean;
	token: string;
}

const initialState: AuthState = {
	isAuth: false,
	token: ""
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, { payload: { isAuth, token } }: PayloadAction<AuthState>) => {
			state.isAuth = isAuth;
			state.token = token;
		}
	}
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
