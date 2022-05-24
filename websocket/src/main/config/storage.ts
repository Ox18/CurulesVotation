import { OnlineStorage } from "../storages/online-storage";
import { ClientsStorage } from "../storages/clients-storage";

export default () => {
	return {
		online: new OnlineStorage(),
		clients: new ClientsStorage(),
	};
};

export namespace Storage {
	export type Response = {
		online: OnlineStorage;
		clients: ClientsStorage;
	};
}
