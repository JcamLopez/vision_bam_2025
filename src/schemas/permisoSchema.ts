import { z } from "zod";


export const permisoSchema = z.object({
    permiso: z.string().min(1, { message: "Debe ingresar el permiso" })
});

export type permisoPayload = z.infer<typeof permisoSchema>;