"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const uuid_1 = require("uuid");
const http_1 = require("http");
const ws_1 = require("ws");
const UserListener_1 = require("./UserListener");
const EscenarioPersonajes_1 = require("./scenes/EscenarioPersonajes");
class Application {
    constructor(app = (0, http_1.createServer)(), users = [], escenarioPersonajes = new EscenarioPersonajes_1.EscenarioPersonajes()) {
        this.app = app;
        this.users = users;
        this.escenarioPersonajes = escenarioPersonajes;
    }
    config() {
        this.ws = new ws_1.WebSocketServer({ server: this.app });
    }
    listeners() {
        this.ws.on("connection", (client) => {
            const user = new UserListener_1.UserListener((0, uuid_1.v4)(), client);
            this.users.push(user);
            this.escenarioPersonajes.events.subscribe("actualizarListaDeFuncionarios", user);
            this.escenarioPersonajes.actualizarListaDeFuncionarios();
            client.on("message", (message) => {
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
                        }
                        else {
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
                const userIndex = this.users.findIndex((user) => user.id === user.id);
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
//# sourceMappingURL=app.js.map