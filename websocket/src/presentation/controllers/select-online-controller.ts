import { CongresistaModel } from "@/domain/models";
import { WebSocket } from "@/main/config/ws";
import { noContent, ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class SelectOnlineController implements Controller {
	constructor() {}

	async handle(request: WebSocket.Response): Promise<HttpResponse> {
		try {
			const {
				data: { id: onlineId },
				storage: { clients, online },
				ws: { id: myClientId },
				send,
			} = request;

			const myClient = clients.get(myClientId);

			if (myClient.congresistaId === onlineId) {
				clients.removeCongresistaId(myClientId);
				online.removeOnline(onlineId);
				clients.sendMessageAll(["client-get-all-online", online.getAll()]);
				return ok(["update-my-congresista", [""]]);
			}

			const onlineData = online.get(onlineId);

			if (!onlineData) {
				throw new Error("No existe el congresista online");
			}

			if (onlineData.online) {
				throw new Error("Este usuario ya está online");
			}

			online.updateOnline(onlineId);
			if (myClient.congresistaId) {
				online.removeOnline(myClient.congresistaId);
			}
			clients.addCongresistaId(onlineId, myClientId);
			send("update-my-congresista", [onlineData.id]);

			clients.sendMessageAll(["client-get-all-online", online.getAll()]);

			return ok(["update-my-congresista", [onlineData.id]]);
		} catch (ex) {
			return noContent();
		}
	}
}
