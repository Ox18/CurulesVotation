import { Server } from "http";
import { WebSocketServer } from "ws";

export default (app: Server): void => {
	const wss = new WebSocketServer({ server: app });

	wss.on("connection", (ws) => {
		console.log("connected");
	});
};
