import prisma from "../libs/prisma.js"

async function createMonitor(body, userIdentify) {
    const {name, type, host, port, path} = body;
    const userId = userIdentify;
    const data = {name, type, host, port, path, userId}
    const monitor = await prisma.monitor.create({
        data
    })

    return monitor;
}

async function collectMonitors(userIdentify) {
    const monitors = await prisma.monitor.findMany({
        where: { 
            userId: userIdentify 
        }
    });
    
    return monitors;
}

export { createMonitor, collectMonitors };