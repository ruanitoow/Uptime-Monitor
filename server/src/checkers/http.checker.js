async function httpChecker(host, path, port, type) {
    // 1. Garante que a URL tenha o protocolo e formata a porta corretamente
    const formatoPorta = port ? `:${port}` : '';
    if (path === null || path === undefined) {
        path = ''
    }
    const target = `${type}://${host}${formatoPorta}${path}`;
    const inicio = Date.now()
    try {
        const response = await fetch(target, {
            signal: AbortSignal.timeout(5000)
        });

        const uptime = response.ok ? "UP" : "DOWN";
        const latency = Date.now() - inicio
        return {
            status: uptime,
            latency: latency,
            statusCode: response.status
        }

    } catch (error) {
        const uptime = "DOWN"
        if (error.name === 'TimeoutError') {
            console.error(`[Timeout] O host ${host} demorou mais de 5s para responder.`);
        } else {
            console.error(`[Erro de Conexão] Falha ao conectar em ${host}:`, error.message);
        }
        const latency = Date.now() - inicio
        return {
            status: uptime,
            latency: latency,
            statusCode: null
        }
    }
}

export default httpChecker;