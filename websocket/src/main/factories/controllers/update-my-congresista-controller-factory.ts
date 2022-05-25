import { UpdateMyCongresistaController } from "@/presentation/controllers/update-my-congresista-controller";
import { Controller } from "@/presentation/protocols";

export const makeWsUpdateMyCongresistaController = (): Controller => {
	const controller = new UpdateMyCongresistaController();
	return controller;
};
