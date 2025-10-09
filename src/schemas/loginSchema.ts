
import { z } from 'zod';
export const loginSchema = z.object({
    usuario: z.string()
        .length(10, { message: "El documento debe tener exactamente 10 dígitos" })
        .regex(/^\d+$/, { message: "El documento solo puede contener números" }),
    clave: z.string()
});

export type loginPayload = z.infer<typeof loginSchema>;