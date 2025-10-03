import { NextResponse } from 'next/server'
import {registroGrado} from '@/services/backend/gradoService'
import {gradoSchema} from '@/schemas/gradoSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = gradoSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
  const grado = await registroGrado(validacion.data);
  return NextResponse.json({mensaje:"paso",grado});
  

    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
