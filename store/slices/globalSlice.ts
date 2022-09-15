// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	showSidebar: boolean;
}

const initialState: GlobalState = {
	showSidebar: false
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleShowSidebar: (state: GlobalState) => {
			state.showSidebar = !state.showSidebar;
		}
	}
});

export const { toggleShowSidebar } = globalSlice.actions;

export default globalSlice.reducer;
