import { SelectOnlineController } from "@/presentation/controllers/select-online-controller";
import { Controller } from "@/presentation/protocols";

export const makeWsSelectOnlineController = (): Controller => {
	const controller = new SelectOnlineController();
	return controller;
};
