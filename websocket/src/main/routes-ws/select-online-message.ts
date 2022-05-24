import { adaptWebsocket } from "../adapters/websocket-adapter";
import { WebSocket } from "../config/ws";
import { makeWsSelectOnlineController } from "../factories/controllers/select-online-controller-factory";

export default (request: WebSocket.Response): void => {
	adaptWebsocket(makeWsSelectOnlineController(), request);
};
