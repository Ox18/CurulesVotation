import { adaptWebsocket } from "../adapters/websocket-adapter";
import { WebSocket } from "../config/ws";
import { makeWsGetAllOnlineController } from "../factories/controllers/get-all-online-controller-factory";

export default (request: WebSocket.Response): void => {
	adaptWebsocket(makeWsGetAllOnlineController(), request);
};
