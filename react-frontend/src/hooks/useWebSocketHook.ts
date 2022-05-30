import { useEffect, useState } from "react";

export const useWebSocketHook = () => {
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
	const [connected, setConnected] = useState(false);
	const [disconnected, setDisconnected] = useState(false);

	useEffect(() => {
		const webSocket = new WebSocket("ws://localhost:8080");
		setWebSocket(webSocket);

		webSocket.onopen = () => {
			setConnected(true);
		};

		webSocket.onclose = () => {
			setDisconnected(true);
		};

		return () => {
			webSocket.close();
		};
	}, []);

	const sendDataToServer = (data: [string, any]) => {
		if (webSocket) {
			webSocket.send(JSON.stringify(data));
		}
	};

	return { webSocket, connected, disconnected, sendDataToServer };
};
