"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListener = void 0;
class UserListener {
    constructor(id, ws, funcionario_id = null) {
        this.id = id;
        this.ws = ws;
        this.funcionario_id = funcionario_id;
    }
    update(data) {
        this.ws.send(JSON.stringify(data));
    }
    setFuncionarioId(id = "") {
        this.funcionario_id = id;
        this.ws.send(JSON.stringify(["set-my-funcionario", { id }]));
    }
    sendData(data) {
        this.ws.send(JSON.stringify(data));
    }
}
exports.UserListener = UserListener;
//# sourceMappingURL=UserListener.js.map