import { CongresistaModel } from "@/domain/models";
import { Storage } from "./storage";

import CongresistasData from "@/network/congresistas.json";

export class OnlineStorage implements Storage<CongresistaModel> {
	private list: CongresistaModel[] = [];

	constructor() {
		const cleanedData = CongresistasData.map(
			(congresista: CongresistaModel) => ({
				...congresista,
				online: false,
			})
		);
		this.set(cleanedData);
	}

	add(item: CongresistaModel): void {
		this.list.push(item);
	}
	remove(item: CongresistaModel): void {
		this.list = this.list.filter((i) => i.id !== item.id);
	}
	clear(): void {
		this.list = [];
	}
	set(items: CongresistaModel[]): void {
		this.list = items;
	}
	getAll(): CongresistaModel[] {
		return this.list;
	}
	get(id: string): CongresistaModel {
		return this.list.find((item) => item.id === id);
	}

	updateOnline(id: string): void {
		const congresista = this.get(id);
		congresista.online = true;
		this.update(congresista);
	}

	update(item: CongresistaModel): void {
		const index = this.list.findIndex((i) => i.id === item.id);
		this.list[index] = item;
	}
}
