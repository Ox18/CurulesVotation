export default (request: any): void => {
    console.log("Se llamo al metodo ping");
    request.ws.send("PONG");
};
