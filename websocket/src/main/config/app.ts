import { createServer, Server } from "http";
import { WebSocketServer } from "ws";

export const setupApp = async (): Promise<Server> => {
	const app = createServer();

	const wss = new WebSocketServer({ server: app });

	return app;
};
