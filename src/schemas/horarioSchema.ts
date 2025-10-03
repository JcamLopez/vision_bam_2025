import { boolean, z } from "zod";


export const horarioSchema = z.object({
    id_docente: z.number(),
    id_materia: z.number(),
    dia: z.string(),
    hora_inicio: z.string(),
    hora_fin: z.string()
});

export type horarioPayload = z.infer<typeof horarioSchema>;