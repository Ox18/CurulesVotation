import { v4 as uuidv4 } from "uuid";
import { Server } from "http";
import { WebSocketServer } from "ws";
import { EscenarioPersonajes } from "@/scenes/EscenarioPersonajes";
import { UserListener } from "@/UserListener";

export default (app: Server) => {
	var users: UserListener[] = [];
	var escenarioPersonajes: EscenarioPersonajes = new EscenarioPersonajes();

	var ws = new WebSocketServer({ server: app });

	ws.on("connection", (client: any) => {
		const user = new UserListener(uuidv4(), client);
		users.push(user);
		escenarioPersonajes.events.subscribe("actualizarListaDeFuncionarios", user);

		escenarioPersonajes.actualizarListaDeFuncionarios();

		client.on("message", (message: any) => {
			const json = JSON.parse(message);
			const [msg, data] = json;

			switch (msg) {
				case "select-funcionario":
					const funcionario_id = data.id;

					const funcionario_data = escenarioPersonajes.findById(funcionario_id);

					if (!funcionario_data) {
						user.alertError("No se encontró el funcionario");
						break;
					}

					if (funcionario_id === user.funcionario_id) {
						escenarioPersonajes.deseleccionar(funcionario_id);
						user.setFuncionarioId();
					} else if (
						user.funcionario_id === "" &&
						funcionario_data.disponible
					) {
						escenarioPersonajes.seleccionar(funcionario_id, user.id);
						user.setFuncionarioId(funcionario_id);
					} else if (
						user.funcionario_id !== "" &&
						funcionario_data.disponible
					) {
						escenarioPersonajes.deseleccionar(user.funcionario_id);
						escenarioPersonajes.seleccionar(funcionario_id, user.id);
						user.setFuncionarioId(funcionario_id);
					} else {
						user.alertInfo("El funcionario seleccionado no está disponible");
					}
					break;
			}
		});

		client.on("close", () => {
			if (user.funcionario_id) {
				escenarioPersonajes.deseleccionar(user.funcionario_id);
			}
			const userIndex = users.findIndex(
				(user: UserListener) => user.id === user.id
			);
			if (userIndex !== -1) {
				users.splice(userIndex, 1);
			}
		});
	});
};
