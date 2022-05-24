import { configureStore } from "@reduxjs/toolkit";

import onlineReducer from "./slices/onlineSlice";

export default configureStore({
	reducer: {
		online: onlineReducer,
	},
});
