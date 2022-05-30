import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "animate.css";
import { Provider } from "react-redux";

import store from "./store";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<ChakraProvider>
		<Suspense fallback={<div>Loading...</div>}>
			<Provider store={store}>
				<App />
			</Provider>
		</Suspense>
	</ChakraProvider>
);
