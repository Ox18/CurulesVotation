import { EventListeners } from "@/EventListeners";

export class EventManager {
	constructor(private listeners: EventManager.Listener[] = []) {}

	subscribe(eventType: string, listener: EventListeners) {
		this.listeners.push([eventType, listener]);
	}

	unsubscribe(eventType: string, listener: EventListeners) {
		this.listeners = this.listeners.filter(
			([type, listener]) => type !== eventType || listener !== listener
		);
	}

	notify(eventType: string, data: any) {
		this.listeners.forEach(([type, listener]) => {
			if (type === eventType) {
				listener.update([eventType, data]);
			}
		});
	}
}

export namespace EventManager {
	export type Listener = [string, EventListeners];
}
