export interface Storage<T> {
	add(item: T): void;
	remove(item: T): void;
	clear(): void;
	set(items: T[]): void;
    getAll(): T[];
    get(id: string): T;
}
