import { OnlineStorage } from "../storages/online-storage";

export default () => {
	return {
		online: new OnlineStorage(),
	};
};

export namespace Storage {
	export type Response = {
		online: OnlineStorage;
	};
}
