export const ws = new WebSocket("ws://localhost:8080");
export const sendToWS = (data: any) => {
	if (ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(data));
	} else {
		ws.onopen = () => {
			ws.send(JSON.stringify(data));
		};
	}
};
