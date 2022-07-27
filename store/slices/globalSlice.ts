// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {}

const initialState: GlobalState = {};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {}
});

// export const {} = globalSlice.actions;

export default globalSlice.reducer;
