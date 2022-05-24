import { GetAllOnlineController } from "@/presentation/controllers/get-all-online-controller";
import { Controller } from "@/presentation/protocols";

export const makeWsGetAllOnlineController = (): Controller => {
	console.log("en factory controller")
	const controller = new GetAllOnlineController();
	return controller;
};
