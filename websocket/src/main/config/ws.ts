import { Server } from "http";
import { WebSocketServer } from "ws";
import { readdirSync } from "fs";
import { join } from "path";

export default (app: Server): void => {
	const wss: WebSocketServer = new WebSocketServer({ server: app });

	wss.on("connection", (ws) => {
		ws.on("message", (message) => {
			const [MSG, DATA] = JSON.parse(message.toString());
			readdirSync(join(__dirname, "../onMessages")).forEach((file) => {
				if (
					file.endsWith(".js") &&
					file.replace("-message.js", "").toLowerCase() === MSG.toLowerCase()
				) {
					const { default: onMessage } = require(join(
						__dirname,
						"../onMessages",
						file
					));
					onMessage({ ws, data: DATA });
				}
			});
		});

		ws.on("close", () => {
			console.log("disconnected");
		});
	});
};
