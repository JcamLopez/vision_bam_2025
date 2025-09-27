import { z } from "zod";


export const misionSchema = z.object({
    mision: z.string().min(1, { message: "Debe ingresar el grupo" })
});

export type misionPayload = z.infer<typeof misionSchema>;