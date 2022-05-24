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
}
