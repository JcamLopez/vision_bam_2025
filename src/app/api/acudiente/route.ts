import { NextResponse } from 'next/server'
import {registroAcudiente} from '@/services/backend/acudienteServices'
import {acudienteSchema} from '@/schemas/acudienteSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = acudienteSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
        const permiso = await registroAcudiente(validacion.data);
        return NextResponse.json(permiso);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}