import { ClientModel } from "@/domain/models";
import { Storage } from "./storage";

export class ClientsStorage implements Storage<ClientModel> {
	private list: ClientModel[] = [];

	constructor() {}

	add(item: ClientModel): void {
		this.list.push(item);
	}
	remove(item: ClientModel): void {
		this.list = this.list.filter((i) => i.id !== item.id);
	}
	clear(): void {
		this.list = [];
	}
	set(items: ClientModel[]): void {
		this.list = items;
	}
	getAll(): ClientModel[] {
		return this.list;
	}
	get(id: string): ClientModel {
		return this.list.find((item) => item.id === id);
	}
	addCongresistaId(congresistaId: string, clientId: string): void {
		const client = this.get(clientId);
		client.congresistaId = congresistaId;
	}
	removeCongresistaId(clientId: string): void {
		const client = this.get(clientId);
		client.congresistaId = null;
	}

	sendMessageAll(message: any): void {
		this.list.forEach((client) => {
			client.send(JSON.stringify(message));
		});
	}
}
