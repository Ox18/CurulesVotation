export interface SelectOnline {
	select(params: SelectOnline.Params): Promise<SelectOnline.Response>;
}

export namespace SelectOnline {
	export type Params = {
		id: string;
	};

	export type Response = void;
}
