
import { NextResponse } from "next/server";

import { loginPayload, loginSchema } from '@/schemas/loginSchema'
import { iniciarSesion } from '@/services/backend/loginServices'
export async function POST(req: Request) {

    try {

        const body = await req.json();
        const validacion = loginSchema.safeParse(body);
        if (!validacion.success) {
            console.dir(validacion.error.format(), { depth: null });

            return NextResponse.json(
                { error: "Datos inválidos", detalles: validacion.error.format() },
                { status: 400 }
            );
        }

        const resultado = await iniciarSesion(validacion.data);

        return NextResponse.json({ resultado });
    } catch (error: any) {
        console.error("Detalle del error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

