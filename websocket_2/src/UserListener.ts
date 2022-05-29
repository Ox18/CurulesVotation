import { EventListeners } from "@/EventListeners";

export class UserListener implements EventListeners {
	constructor(
		public id: string,
		public ws: any,
		public funcionario_id: string = null
	) {}

	update(data: any): void {
		this.ws.send(JSON.stringify(data));
	}

	setFuncionarioId(id: string = "") {
		this.funcionario_id = id;
		this.ws.send(JSON.stringify(["set-my-funcionario", { id }]));
	}

	sendData(data: any) {
		this.ws.send(JSON.stringify(data));
	}
}
