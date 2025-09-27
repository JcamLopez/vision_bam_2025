import { NextResponse } from 'next/server'
import {registroMateria} from '@/services/backend/materiaService'
import {materiaSchema} from '@/schemas/materiaSchema'

export async function POST(req:Request) {
    try {
          const body = await req.json();
          const validacion = materiaSchema.safeParse(body);
           if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
        const materia = await registroMateria(validacion.data);
        return NextResponse.json(materia);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}