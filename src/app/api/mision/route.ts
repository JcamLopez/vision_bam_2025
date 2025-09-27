import { NextResponse } from 'next/server'
import {registroMision} from '@/services/backend/misionServices'
import {misionSchema} from '@/schemas/misionSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = misionSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
        const mision = await registroMision(validacion.data);
        return NextResponse.json(mision);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}