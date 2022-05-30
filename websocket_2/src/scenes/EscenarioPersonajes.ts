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

	seleccionar(funcionario_id: string, user_id: string) {
		this.updateBasicDataOfFuncionario(funcionario_id, {
			disponible: false,
			user_id,
		});
	}

	deseleccionar(funcionario_id: string) {
		this.updateBasicDataOfFuncionario(funcionario_id, {
			disponible: true,
			user_id: "",
		});
	}

	private updateBasicDataOfFuncionario(funcionario_id: string, data: any) {
		const funcionario = this.findById(funcionario_id);
		if (funcionario) {
			Object.assign(funcionario, data);
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
