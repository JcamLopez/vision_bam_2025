import { z } from "zod";



export const gradoSchema = z.object({
    grado: z.string().min(1, { message: "Debe ingresar el grado" })
});

export type gradoPayload = z.infer<typeof gradoSchema>;