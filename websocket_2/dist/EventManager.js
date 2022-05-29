"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
class EventManager {
    constructor(listeners = []) {
        this.listeners = listeners;
    }
    subscribe(eventType, listener) {
        this.listeners.push([eventType, listener]);
    }
    unsubscribe(eventType, listener) {
        this.listeners = this.listeners.filter(([type, listener]) => type !== eventType || listener !== listener);
    }
    notify(eventType, data) {
        this.listeners.forEach(([type, listener]) => {
            if (type === eventType) {
                listener.update([eventType, data]);
            }
        });
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map