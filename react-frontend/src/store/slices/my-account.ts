import { createSlice } from "@reduxjs/toolkit";

export const myAccount = createSlice({
	name: "myAccount",
	initialState: {
		funcionarioId: "",
	},
	reducers: {
		setFuncionarioId: (state, action) => {
			state.funcionarioId = action.payload;
		},
	},
});

export const { setFuncionarioId } = myAccount.actions;

export default myAccount.reducer;
