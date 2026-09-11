import prisma from "../libs/prisma.js"

async function createMonitor(body, userIdentify) {
    const { name, type, host, port, path } = body;
    const userId = userIdentify;
    const data = { name, type, host, port, path, userId }
    const monitor = await prisma.monitor.create({
        data
    })

    return monitor;
}

async function collectMonitors(userIdentify) {
    const monitors = await prisma.monitor.findMany({
        where: { userId: userIdentify },
        include: {
            checks: {
                take: 1,
                orderBy: { checkedAt: 'desc' }
            }
        }
    });

    return monitors.map(monitor => ({
        ...monitor,
        status: monitor.checks[0]?.status ?? "DOWN",
        latency: monitor.checks[0]?.latency ?? null
    }));
}

async function collectMonitorsById(params, userIdentify) {
    const id = parseInt(params)
    const idInvalido = isNaN(id)
    const userId = userIdentify
    if (idInvalido) return null;

    let monitor = await prisma.monitor.findFirst({
        where: {
            id,
            userId
        }, include: {
            checks: {
                take: 50,
                orderBy: {
                    checkedAt: 'desc'
                }
            }
        }
    })
    return monitor;
}

async function deleteMonitor(params, userIdentify) {
    const id = parseInt(params, 10);
    if (isNaN(id)) return null;
    const monitor = await prisma.monitor.findFirst({
        where: { id, userId: userIdentify }
    });
    if (!monitor) return null;
    await prisma.check.deleteMany({
        where: { monitorId: id }
    });
    await prisma.monitor.delete({
        where: { id }
    });
    return monitor;
}
export { createMonitor, collectMonitors, collectMonitorsById, deleteMonitor };