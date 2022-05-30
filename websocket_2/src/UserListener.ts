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

	alertSuccess(message: string) {
		this.alert("success", message);
	}

	alertError(message: string) {
		this.alert("error", message);
	}

	alertInfo(message: string) {
		this.alert("info", message);
	}

	alert(type: string, message: string) {
		this.ws.send(JSON.stringify(["alert", { type, message }]));
	}

	sendData(data: any) {
		this.ws.send(JSON.stringify(data));
	}
}
