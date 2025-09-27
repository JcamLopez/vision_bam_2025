import { z } from "zod";



export const materiaSchema = z.object({
    materia: z.string().min(1, { message: "Debe ingresar la materia" })
});

export type materiaPayload = z.infer<typeof materiaSchema>;