import { z } from "zod";


export const visionSchema = z.object({
    vision: z.string().min(1, { message: "Debe ingresar el grupo" })
});

export type visionPayload = z.infer<typeof visionSchema>;