import { TablePersons } from "@/components/common/TablePersons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setOnline } from "./store/slices/onlineSlice";
import { setFuncionarioId } from "@/store/slices/my-account";
import { useToast } from "@chakra-ui/react";

function App() {
	const dispatch = useDispatch();
	const toast = useToast();

	const [ws] = useState(new WebSocket("ws://localhost:8080"));

	const sendToWS = (data: [string, any]) => {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(data));
		} else {
			ws.onopen = () => {
				ws.send(JSON.stringify(data));
			};
		}
	};

	ws.onmessage = function (event: any) {
		const eJSON = JSON.parse(event.data);
		const [msg, data] = eJSON;

		switch (msg) {
			case "actualizarListaDeFuncionarios":
				dispatch(setOnline(data));
				break;
			case "set-my-funcionario":
				dispatch(setFuncionarioId(data.id));
				break;
			case "alert":
				const { type, message } = data;
				toast({
					title: message,
					status: type,
					duration: 9000,
					isClosable: true,
				});
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

	return (
		<>
			<TablePersons sendToWS={sendToWS} />
		</>
	);
}

export default App;
