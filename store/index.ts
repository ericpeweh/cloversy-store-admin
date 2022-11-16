// Dependencies
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Slices
import globalReducer from "./slices/globalSlice";
import authReducer from "./slices/authSlice";

// API
import API from "../api";

const store = configureStore({
	reducer: {
		global: globalReducer,
		auth: authReducer,
		[API.reducerPath]: API.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(API.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
