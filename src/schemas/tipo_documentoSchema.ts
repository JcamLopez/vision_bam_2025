import { z } from "zod";

const tipoDocumentoEnum = z.enum(['CC', 'TI', 'CE', 'NIT']);

export const tipoDocumentoSchema = z.object({
    tipo: tipoDocumentoEnum
});

export type tipoDocumentoPayload = z.infer<typeof tipoDocumentoSchema>;