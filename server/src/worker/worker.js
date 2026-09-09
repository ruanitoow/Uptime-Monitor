import prisma from "../libs/prisma.js";
import { setTimeout } from "node:timers/promises";
import tcpChecker from '../checkers/tcp.checker.js'
import httpChecker from "../checkers/http.checker.js";

async function workerAction() {
    const monitores = await prisma.monitor.findMany({
        where: {
            active: true
        }
    })
    for (const monitor of monitores) {
        try {
            if (monitor.type === "TCP") {
                const payload = {
                    host: monitor.host,
                    port: monitor.port
                }
                const check = await tcpChecker(payload);
                console.log(check)
            } else if (monitor.type === "HTTP" || monitor.type === "HTTPS") {
                const path = monitor.path ? monitor.path : ""
                const payload = {
                    type: monitor.type,
                    host: monitor.host,
                    port: monitor.port,
                    path: path
                }
                const check = await httpChecker(payload)
                console.log(check)
            }
        } catch (e) {
            console.error(`Falha no monitor ${monitor.name}:`, e.message);
        }
    }

}

async function startWorker() {
    while (true) {
        try {
            await workerAction();
        } catch (e) {
            console.error("Erro crítico no ciclo do worker:", e.message)
        }
        await setTimeout(5000);
    }
}
startWorker();