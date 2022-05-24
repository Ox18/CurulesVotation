import { WebSocket } from "@/main/config/ws";
import { ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class GetAllOnlineController implements Controller {
	constructor() {}

	async handle(request: WebSocket.Response): Promise<HttpResponse> {
		return ok(["client-get-all-online", request.storage.online.getAll()]);
	}
}
