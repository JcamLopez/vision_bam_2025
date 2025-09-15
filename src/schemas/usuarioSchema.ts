import { z } from "zod";

export const tipoDocumentoEnum = z.enum(['CC', 'TI', 'CE', 'NIT']);
export const rolEnum = z.enum(['ESTUDIANTE', 'DOCENTE', 'ADMIMINISTRATIVO']);
export const generoEnum = z.enum(['HOMBRE', 'MUJER']);

export const usuarioSchema = z.object({
    doc: z.string()
        .length(10, { message: "El documento debe tener exactamente 10 dígitos" })
        .regex(/^\d+$/, { message: "El documento solo puede contener números" }),
    tipo: tipoDocumentoEnum,
    n1: z.string().min(1, { message: "El primer nombre es obligatorio" }),
    n2: z.string().optional(),
    ap1: z.string().min(1, { message: "El primer apellido es obligatorio" }),
    ap2: z.string().optional(),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    genero: generoEnum,
    fecha_nacimiento: z.string().refine((date) => {
        return !isNaN(Date.parse(date));
    }, { message: "Fecha de nacimiento inválida" }),
    tel: z.string()
        .length(10, { message: "El teléfono debe tener exactamente 10 dígitos" })
        .regex(/^\d+$/, { message: "El teléfono solo puede contener números" }),
    ubicacion: z.string().min(1, { message: "La ubicación es obligatoria" }),
    rol: rolEnum,
    clave: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
    departamento: z.string().min(1, { message: "El departamento es obligatorio" }),
    municipio: z.string().min(1, { message: "El municipio es obligatorio" })
});

export type usuarioPayload = z.infer<typeof usuarioSchema>;