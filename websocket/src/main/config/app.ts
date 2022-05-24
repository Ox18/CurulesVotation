import { createServer, Server } from "http";
import { WebSocketServer } from "ws";

export const setupApp = async (): Promise<Server> => {
	const app = createServer();

	const wss = new WebSocketServer({ server: app });

	wss.on("connection", (ws) => {
		// get id of connection
		
	});

	return app;
};
