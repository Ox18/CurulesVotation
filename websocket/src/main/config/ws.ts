import { v4 as uuidv4 } from "uuid";
import { Server } from "http";
import { WebSocketServer } from "ws";
import { readdirSync } from "fs";
import { join } from "path";

import setupStorage, { Storage } from "./storage";

export default (app: Server): void => {
	const storage = setupStorage();

	const wss: WebSocketServer = new WebSocketServer({ server: app });

	wss.on("connection", (ws) => {
		ws.id = uuidv4();

		const send = (data) => {
			ws.send(JSON.stringify(data));
		};

		ws.on("message", (message) => {
			const [MSG, DATA] = JSON.parse(message.toString());
			readdirSync(join(__dirname, "../routes-ws")).forEach((file) => {
				if (
					file.endsWith(".js") &&
					file.replace("-message.js", "").toLowerCase() === MSG.toLowerCase()
				) {
					const { default: onMessage } = require(join(
						__dirname,
						"../routes-ws",
						file
					));
					onMessage({ ws, data: DATA, send, storage });
				}
			});
		});

		ws.on("close", () => {
			console.log("disconnected");
		});
	});
};

export namespace WebSocket {
	export type Response = {
		ws: {
			send: (message: string) => void;
		};
		data: any;
		send: (msg: string, data?: any) => void;
		storage: Storage.Response;
	};
}
