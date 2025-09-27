import { z } from "zod";


export const historiaSchema = z.object({
    historia: z.string().min(1, { message: "Debe registrar la historia" })
});

export type historiaPayload = z.infer<typeof historiaSchema>;