import prisma from "../libs/prisma.js"

async function createMonitor(info) {
    const {name, type, host, port, path} = info;
    const data = {name, type, host, port, path}
    const monitor = await prisma.monitor.create({
        data
    })

    return monitor;
}

export default createMonitor;