// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	showSidebar: boolean;
	notReadNotificationCount: number;
}

const initialState: GlobalState = {
	showSidebar: false,
	notReadNotificationCount: 0
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleShowSidebar: (state: GlobalState) => {
			state.showSidebar = !state.showSidebar;
		},
		setNotReadNotificationCount: (state, { payload }: PayloadAction<number>) => {
			state.notReadNotificationCount = payload;
		}
	}
});

export const { toggleShowSidebar, setNotReadNotificationCount } = globalSlice.actions;

export default globalSlice.reducer;
