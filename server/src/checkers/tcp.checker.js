import net from "node:net"

function tcpChecker(host, port) {
    const cliente = new net.Socket();
    const tryConnect = new Promise((resolve) => {
        cliente.setTimeout(5000);
        const inicio = Date.now();
        cliente.connect(port, host, () => {
            const latencia = Date.now() - inicio;
            const resultado = { sucesso: true, motivo: "Conexão bem sucedida", latencia };
            cliente.destroy();
            resolve(resultado);
        });

        cliente.on('error', () => {
            const resultado = { sucesso: false, motivo: "Inacessível" };
            cliente.destroy();
            resolve(resultado);
        });

        cliente.on('timeout', () => {

            const resultado = { sucesso: false, motivo: "Tempo esgotado" }
            cliente.destroy();
            resolve(resultado)
        });
    });

    return tryConnect;
}

export default tcpChecker;