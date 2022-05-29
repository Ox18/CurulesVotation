import { FuncionarioModel } from "@/domain/model/funcionario";
import { EventManager } from "@/EventManager";
import initialData from "@/network/funcionarios.json";

export class EscenarioPersonajes {
	constructor(
		private funcionarios: FuncionarioModel[] = [],
		public events: EventManager = new EventManager()
	) {
		this.initializeData();
	}

	initializeData() {
		this.funcionarios = initialData.map((item: FuncionarioModel) => ({
			...item,
			disponible: true,
			admin: item.admin ? true : false,
			user_id: "",
		}));
	}

	seleccionar(id: string, user_id: string){
		const funcionario = this.funcionarios.find(item => item.id === id);
		if(funcionario){
			funcionario.disponible = false;
			funcionario.user_id = user_id;
			this.actualizarListaDeFuncionarios();
		}
	}

	deseleccionar(id: string){
		const funcionario = this.funcionarios.find(item => item.id === id);
		if(funcionario){
			funcionario.disponible = true;
			funcionario.user_id = "";
			this.actualizarListaDeFuncionarios();
		}
	}

	actualizarListaDeFuncionarios() {
		this.events.notify("actualizarListaDeFuncionarios", this.funcionarios);
	}

	isDisponible(id: string){
		const funcionario = this.funcionarios.find(item => item.id === id);
		return funcionario.disponible;
	}
}
