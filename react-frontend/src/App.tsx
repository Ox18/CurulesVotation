import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setOnline } from "./store/slices/onlineSlice";
import { setFuncionarioId } from "@/store/slices/my-account";
import { useToast } from "@chakra-ui/react";
import { useWebSocketHook } from "./hooks/useWebSocketHook";
import { LobbyChannel } from "./views/LobbyChannel";
import { VotacionChannel } from "./views/VotacionChannel";

function App() {
	const dispatch = useDispatch();
	const toast = useToast();

	const { myAccount } = useSelector((state: any) => state);

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
			{myAccount.channel === 0 && (
				<LobbyChannel
					{...{
						sendDataToServer,
					}}
				/>
			)}
			{myAccount.channel === 1 && <VotacionChannel />}
		</>
	);
}

export default App;
