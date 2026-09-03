import { z } from 'zod';

const options = ["TCP", "HTTP", "HTTPS"];

const createMonitorSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    type: z.enum(options),
    host: z.string().nonempty(),
    port: z.number().int().min(1, 'Porta mínima é 1').max(65535, 'Porta máxima é 65535'),
    path: z.string().optional()
});

export default createMonitorSchema;