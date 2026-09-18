import prisma from "../libs/prisma.js";

async function createMonitor(body, userIdentify) {
  const { name, type, host, port, path } = body;
  const userId = userIdentify;
  const data = { name, type, host, port, path, userId };
  const monitor = await prisma.monitor.create({
    data,
  });

  return monitor;
}

async function collectMonitors(userIdentify) {
  const monitors = await prisma.monitor.findMany({
    where: { userId: userIdentify },
    include: {
      checks: {
        take: 1,
        orderBy: { checkedAt: "desc" },
      },
    },
  });

  return monitors.map((monitor) => ({
    ...monitor,
    status: monitor.checks[0]?.status ?? "DOWN",
    latency: monitor.checks[0]?.latency ?? null,
  }));
}

async function collectMonitorsById(params, userIdentify, period) {
  const id = parseInt(params);
  const selectedPeriod = period != undefined ? period : "24h";
  let timeRangeMs;
  const idInvalido = isNaN(id);
  const userId = userIdentify;
  if (idInvalido) return null;

  switch (selectedPeriod) {
    case "24h":
      timeRangeMs = 24 * 60 * 60 * 1000;
      break;
    case "7d":
      timeRangeMs = 7 * 24 * 60 * 60 * 1000;
      break;
    case "30d":
      timeRangeMs = 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      timeRangeMs = 24 * 60 * 60 * 1000;
      break;
  }
  const startDate = new Date(Date.now() - timeRangeMs);

  let monitor = await prisma.monitor.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      checks: {
        where: {
          checkedAt: {
            gte: startDate,
          },
        },
        orderBy: {
          checkedAt: "desc",
        },
      },
    },
  });
  if (!monitor) return null;

  let upCount = 0;
  let totalLatency = 0;
  const totalChecks = monitor.checks.length;

  monitor.checks.forEach((check) => {
    if (check.status === "UP") {
      upCount++;
    }
    totalLatency += check.latency ?? 0;
  });

  const uptimePercentage =
    totalChecks > 0 ? Number((upCount / totalChecks) * 100.0).toFixed(2) : null;
  const avgLatency = totalChecks > 0 ? totalLatency / totalChecks : null;

  return { ...monitor, avgLatency, uptimePercentage };
}

async function deleteMonitor(params, userIdentify) {
  const id = parseInt(params, 10);
  if (isNaN(id)) return null;
  const monitor = await prisma.monitor.findFirst({
    where: { id, userId: userIdentify },
  });
  if (!monitor) return null;
  await prisma.check.deleteMany({
    where: { monitorId: id },
  });
  await prisma.monitor.delete({
    where: { id },
  });
  return monitor;
}
export { createMonitor, collectMonitors, collectMonitorsById, deleteMonitor };
