"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscenarioPersonajes = void 0;
const EventManager_1 = require("@/EventManager");
const funcionarios_json_1 = __importDefault(require("@/network/funcionarios.json"));
class EscenarioPersonajes {
    constructor(funcionarios = [], events = new EventManager_1.EventManager()) {
        this.funcionarios = funcionarios;
        this.events = events;
        this.initializeData();
    }
    initializeData() {
        this.funcionarios = funcionarios_json_1.default.map((item) => ({
            ...item,
            disponible: true,
            admin: item.admin ? true : false,
            user_id: "",
        }));
    }
    seleccionar(id, user_id) {
        const funcionario = this.funcionarios.find(item => item.id === id);
        if (funcionario) {
            funcionario.disponible = false;
            funcionario.user_id = user_id;
            this.actualizarListaDeFuncionarios();
        }
    }
    deseleccionar(id) {
        const funcionario = this.funcionarios.find(item => item.id === id);
        if (funcionario) {
            funcionario.disponible = true;
            funcionario.user_id = "";
            this.actualizarListaDeFuncionarios();
        }
    }
    actualizarListaDeFuncionarios() {
        this.events.notify("actualizarListaDeFuncionarios", this.funcionarios);
    }
    isDisponible(id) {
        const funcionario = this.funcionarios.find(item => item.id === id);
        return funcionario.disponible;
    }
}
exports.EscenarioPersonajes = EscenarioPersonajes;
//# sourceMappingURL=EscenarioPersonajes.js.map