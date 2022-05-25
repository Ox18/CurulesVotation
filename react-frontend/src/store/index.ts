import { configureStore } from "@reduxjs/toolkit";

import onlineReducer from "./slices/onlineSlice";
import myCongresistaSlice from "./slices/my-congresista";

export default configureStore({
	reducer: {
		online: onlineReducer,
		myCongresista: myCongresistaSlice,
	},
});
