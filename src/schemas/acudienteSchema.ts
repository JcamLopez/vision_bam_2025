import { z } from "zod";


export const acudienteSchema = z.object({
    acudiente: z.string().min(1, { message: "Debe ingresar el parentesco" })
});

export type acudientePayload = z.infer<typeof acudienteSchema>;