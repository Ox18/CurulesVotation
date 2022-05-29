import "module-alias/register";

import { v4 as uuidv4 } from "uuid";
import { createServer, Server } from "http";
import { WebSocketServer } from "ws";
import { UserListener } from "./UserListener";
import { EscenarioPersonajes } from "./scenes/EscenarioPersonajes";

class Application {
	ws: WebSocketServer;

	constructor(
		private app: Server = createServer(),
		private users: UserListener[] = [],
		private escenarioPersonajes: EscenarioPersonajes = new EscenarioPersonajes()
	) {}

	config() {
		this.ws = new WebSocketServer({ server: this.app });
	}

	listeners() {
		this.ws.on("connection", (client: any) => {
			const user = new UserListener(uuidv4(), client);
			this.users.push(user);
			this.escenarioPersonajes.events.subscribe(
				"actualizarListaDeFuncionarios",
				user
			);

			this.escenarioPersonajes.actualizarListaDeFuncionarios();

			client.on("message", (message: any) => {
				const json = JSON.parse(message);
				const [msg, data] = json;

				switch (msg) {
					case "select-funcionario":
						const funcionario_id = data.id;
						if (this.escenarioPersonajes.isDisponible(funcionario_id)) {
							if (user.funcionario_id) {
								this.escenarioPersonajes.deseleccionar(user.funcionario_id);
							}

							this.escenarioPersonajes.seleccionar(funcionario_id, user.id);
							user.setFuncionarioId(funcionario_id);
						} else {
							if (funcionario_id === user.funcionario_id) {
								this.escenarioPersonajes.deseleccionar(funcionario_id);
								user.setFuncionarioId();
							}
						}
						break;
				}
			});

			client.on("close", () => {
				if (user.funcionario_id) {
					this.escenarioPersonajes.deseleccionar(user.funcionario_id);
				}
				const userIndex = this.users.findIndex(
					(user: UserListener) => user.id === user.id
				);
				if (userIndex !== -1) {
					this.users.splice(userIndex, 1);
				}
			});
		});
	}

	start() {
		this.config();
		this.listeners();
		this.app.listen(8080, () => {
			console.log("Server started on port 3000");
		});
	}
}

const app = new Application();
app.start();
