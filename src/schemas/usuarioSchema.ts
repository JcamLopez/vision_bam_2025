import { string, z } from "zod";


export const tipoDocumentoEnum = z.enum(['CC', 'TI', 'CE', 'NIT']);
export const rolEnum = z.enum(['ESTUDIANTE', 'DOCENTE', 'RECTOR', 'CORDINADOR', 'SECRETARIA']);
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
    tel: z.string()
        .length(10, { message: "El teléfono debe tener exactamente 10 dígitos" })
        .regex(/^\d+$/, { message: "El teléfono solo puede contener números" }),
    rol: rolEnum,
    clave: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
    departamento: z.string().min(1, { message: "El departamento es obligatorio" }),
    municipio: z.string().min(1, { message: "El municipio es obligatorio" }),
    barrio: z.string().min(1, { message: "Debe ingresar el barrio" }),
    direccion: z.string().min(1, { message: "Debe ingresar una direccion" }),

    numero_documento_acudiente: z
        .string()
        .length(10, { message: 'El documento debe tener exactamente 10 dígitos' })
        .regex(/^\d+$/, { message: 'El documento solo puede contener números' })
        .optional(),
    n1_acudiente: z.string().optional(),
    n2_acudiente: z.string().optional(),
    ap1_acudiente: z.string().optional(),
    ap2_acudiente: z.string().optional(),
    telefono_acudiente: z.string().optional(),
    correo_acudiente: z.string().optional(),
    parentezco: z.string().optional(),
    /*  fecha_nacimiento: z.string().optional(), */
    grado: z.string().optional(),
    departamento_acudiente: z.string().optional(),
    municipio_acudiente: z.string().optional(),
    barrio_acudiente: z.string().optional(),
    direccion_acudiente: z.string().optional(),
    titulo_formacion: z.string().optional(),
    formacion: z.string().optional(),
    grado_escalafon: z.string().optional(),
    nivel_salarial: z.string().optional(),
    nivel_academico: z.string().optional(),


})
    .superRefine((data, ctx) => {
        if (data.rol === "ESTUDIANTE") {
            if (!data.numero_documento_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["numero_documento_acudiente"],
                    message: "El primer nombre del acudiente es obligatorio",
                });
            }
            if (!data.n1_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["n1_acudiente"],
                    message: "El primer nombre del acudiente es obligatorio",
                });
            }
            if (!data.ap1_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["ap1_acudiente"],
                    message: "El primer apellido del acudiente es obligatorio",
                });
            }
            const tel = data.telefono_acudiente?.trim();
            if (!tel || !/^\d{10}$/.test(tel)) {
                ctx.addIssue({
                    code: "custom",
                    path: ["telefono_acudiente"],
                    message: "El teléfono del acudiente debe tener exactamente 10 dígitos numéricos",
                });
            }

            if (!data.correo_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["correo_acudiente"],
                    message: "El correo del acudiente es obligatorio",
                });
            }
            if (!data.parentezco) {
                ctx.addIssue({
                    code: "custom",
                    path: ["parentezco"],
                    message: "El parentesco es obligatorio",
                });
            }
            /*   if (!data.fecha_nacimiento) {
                  ctx.addIssue({
                      code: "custom",
                      path: ["fecha_nacimiento"],
                      message: "La fecha de nacimiento es obligatoria",
                  });
              } */
            if (!data.departamento_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["departamento_acudiente"],
                    message: "Debe seleccionar un departamento",
                });
            }
            if (!data.municipio_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["municipio_acudiente"],
                    message: "Debe seleccionar un municipio",
                });
            }

            if (!data.direccion_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["direccion_acudiente"],
                    message: "Debe ingresar la direccion",
                });
            }


            if (!data.barrio_acudiente) {
                ctx.addIssue({
                    code: "custom",
                    path: ["barrio_acudiente"],
                    message: "Debe ingresar el barrio",
                });
            }
        } else {
            if (data.rol === "DOCENTE") {

                if (!data.titulo_formacion) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["titulo_formacion"],
                        message: "Debe registrar su formacion",
                    });
                }

                if (!data.formacion) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["formacion"],
                        message: "Debe seleccionar una formacion",
                    });
                }


                if (!data.grado_escalafon) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["grado_escalafon"],
                        message: "Debe seleccionar el escalafon",
                    });
                }


                if (!data.nivel_salarial) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["nivel_salarial"],
                        message: "Debe seleccionar el nivel salarial",
                    });
                }


                if (!data.nivel_academico) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["nivel_academico"],
                        message: "Debe seleccionar el nivel academico",
                    });
                }
            }

        }
    });


export type usuarioPayload = z.infer<typeof usuarioSchema>;