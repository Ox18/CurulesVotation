import { configureStore } from "@reduxjs/toolkit";

import online from "./slices/onlineSlice";
import myAccount from "./slices/my-account";

export default configureStore({
	reducer: {
		online,
		myAccount,
	},
});
