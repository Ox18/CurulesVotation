import { WebSocket } from "@/main/config/ws";
import { ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class SelectOnlineController implements Controller {
	constructor() {}

	async handle(request: WebSocket.Response): Promise<HttpResponse> {
		const { id } = request.data;

		request.storage.online.updateOnline(id);

		request.storage.clients.getAll().forEach((client) => {
			client.send(
				JSON.stringify([
					"client-get-all-online",
					request.storage.online.getAll(),
				])
			);
		});

		return ok([]);
	}
}
