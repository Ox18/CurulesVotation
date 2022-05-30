import { createServer, Server } from "http";
import setupWS from "@/main/config/ws";

export const setupApp = async (): Promise<Server> => {
	const app = createServer();
	setupWS(app);
	return app;
};
