import { z } from "zod";


export const grupoSchema = z.object({
    grupo: z.string().min(1, { message: "Debe ingresar el grupo" })
});

export type grupoPayload = z.infer<typeof grupoSchema>;