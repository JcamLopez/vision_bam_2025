import { NextResponse } from 'next/server'
import {registroVision} from '@/services/backend/visionServices'
import {visionSchema} from '@/schemas/visionSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = visionSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
        const vision = await registroVision(validacion.data);
        return NextResponse.json(vision);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}