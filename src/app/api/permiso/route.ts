import { NextResponse } from 'next/server'
import {registroPermiso} from '@/services/backend/permisoServices'
import {permisoSchema} from '@/schemas/permisoSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = permisoSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
        const permiso = await registroPermiso(validacion.data);
        return NextResponse.json(permiso);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}