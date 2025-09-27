import { z } from "zod";


export const publicacionSchema = z.object({
    publicacion: z.string().min(1, { message: "Debe ingresar una publicacion" })
});

export type publicacionPayload = z.infer<typeof publicacionSchema>;