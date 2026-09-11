import net from "node:net";

function tcpChecker({host, port}) {
    return new Promise((resolve) => {
        const cliente = new net.Socket();
        cliente.setTimeout(5000);
        const inicio = Date.now();

        cliente.connect(port, host, () => {
            const latency = Date.now() - inicio;
            cliente.destroy();
            resolve({
                status: "UP",
                latency: latency,
                statusCode: null
            });
        });

        cliente.on('error', (error) => {
            const latency = Date.now() - inicio;
            console.error(`[Erro de Conexão TCP] Falha ao conectar em ${host}:${port}:`, error.message);
            cliente.destroy();
            resolve({
                status: "DOWN",
                latency: latency,
                statusCode: null
            });
        });

        cliente.on('timeout', () => {
            const latency = Date.now() - inicio;
            console.error(`[Timeout TCP] O host ${host}:${port} demorou mais de 5s para responder.`);
            cliente.destroy();
            resolve({
                status: "DOWN",
                latency: latency,
                statusCode: null
            });
        });
    });
}

export default tcpChecker;