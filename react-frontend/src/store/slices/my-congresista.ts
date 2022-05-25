import { createSlice } from "@reduxjs/toolkit";

export const myCongresistaSlice = createSlice({
	name: "myCongresista",
	initialState: {
		congresistaId: "",
	},
	reducers: {
		setCongresistaId: (state, action) => {
			state.congresistaId = action.payload;
		},
	},
});

export const { setCongresistaId } = myCongresistaSlice.actions;

export default myCongresistaSlice.reducer;
