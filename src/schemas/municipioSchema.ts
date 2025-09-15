
import { z } from 'zod';
export const departamentoSchema = z.object({
    departamentoId: z.string().regex(/^\d+$/),
});