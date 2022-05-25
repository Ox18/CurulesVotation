import { WebSocket } from "@/main/config/ws";
import { ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class UpdateMyCongresistaController implements Controller {
	constructor() {}

	async handle(request: WebSocket.Response): Promise<HttpResponse> {
		const { ws, send } = request;

		send("update-my-congresista", ws.congresistaId);

		return ok({});
	}
}
