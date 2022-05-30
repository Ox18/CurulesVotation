import { createSlice } from "@reduxjs/toolkit";

export const myAccount = createSlice({
	name: "myAccount",
	initialState: {
		funcionarioId: "",
		channel: 0,
	},
	reducers: {
		setFuncionarioId: (state, action) => {
			state.funcionarioId = action.payload;
		},
		setChannel: (state, action) => {
			state.channel = action.payload;
		},
	},
});

export const { setFuncionarioId, setChannel } = myAccount.actions;

export default myAccount.reducer;
