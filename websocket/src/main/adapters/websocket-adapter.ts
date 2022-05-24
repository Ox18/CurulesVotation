import { Controller } from "@/presentation/protocols/controller";
import { WebSocket } from "../config/ws";

export const adaptWebsocket = async (
	controller: Controller,
	webSocketData: WebSocket.Response
) => {
	const httpResponse = await controller.handle(webSocketData);

	webSocketData.send(httpResponse.body);
};
