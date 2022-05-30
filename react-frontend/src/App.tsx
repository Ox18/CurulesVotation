import { TablePersons } from "@/components/common/TablePersons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setOnline } from "./store/slices/onlineSlice";
import { setFuncionarioId } from "@/store/slices/my-account";
import { useToast } from "@chakra-ui/react";
import { useWebSocketHook } from "./hooks/useWebSocketHook";

function App() {
	const dispatch = useDispatch();
	const toast = useToast();

	const { webSocket, sendDataToServer, connected } = useWebSocketHook();

	useEffect(() => {
		if (webSocket?.readyState === 1) {
			sendDataToServer([
				"get-all-online",
				{
					dato: "dato",
				},
			]);
		}

		if (webSocket) {
			webSocket.onmessage = (event: any) => {
				const [msg, data] = JSON.parse(event.data);

				switch (msg) {
					case "actualizarListaDeFuncionarios":
						dispatch(setOnline(data));
						break;
					case "set-my-funcionario":
						dispatch(setFuncionarioId(data.id));
						break;
					case "alert":
						toast(data);
						break;
				}
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connected]);

	return (
		<>
			<TablePersons sendToWS={sendDataToServer} />
		</>
	);
}

export default App;
