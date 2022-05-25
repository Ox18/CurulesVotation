import { TablePersons } from "@/components/common/TablePersons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setOnline } from "./store/slices/onlineSlice";
import { setCongresistaId } from "./store/slices/my-congresista";

import { ws, sendToWS } from "./ws";

function App() {
	const dispatch = useDispatch();

	ws.onmessage = function (event: any) {
		const eJSON = JSON.parse(event.data);
		const [msg, data] = eJSON;
		if (msg === "client-get-all-online") {
			dispatch(setOnline(data));
		}

		switch (msg) {
			case "client-get-my-congresista":
				dispatch(setCongresistaId(data));
				break;
			case "update-my-congresista":
				dispatch(setCongresistaId(data[0]));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		sendToWS([
			"get-all-online",
			{
				dato: "dato",
			},
		]);
		return () => {
			console.log("unmount");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <TablePersons />;
}

export default App;
