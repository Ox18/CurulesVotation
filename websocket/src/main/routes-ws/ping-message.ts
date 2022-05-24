import { WebSocket } from "../config/ws";

export default (request: WebSocket.Response): void => {
	request.ws.send("pong");
};
