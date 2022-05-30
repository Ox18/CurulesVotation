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

	seleccionar(id: string, user_id: string) {
		this.updateBasicDataOfFuncionario(id, false, user_id);
	}

	deseleccionar(id: string) {
		this.updateBasicDataOfFuncionario(id, true);
	}

	private updateBasicDataOfFuncionario(
		funcionario_id: string,
		disponible: boolean,
		user_id: string = ""
	) {
		const funcionario = this.findById(funcionario_id);
		if (funcionario) {
			funcionario.disponible = disponible;
			funcionario.user_id = user_id;
			this.actualizarListaDeFuncionarios();
		}
	}

	actualizarListaDeFuncionarios() {
		this.events.notify("actualizarListaDeFuncionarios", this.funcionarios);
	}

	findById(id: string) {
		return this.funcionarios.find((item) => item.id === id);
	}
}
