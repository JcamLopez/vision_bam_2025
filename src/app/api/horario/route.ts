import { NextResponse } from 'next/server'
import { registroHorario } from '@/services/backend/horarioServices'
import { horarioSchema } from '@/schemas/horarioSchema'
export async function POST(req: Request) {
    try {
           const body = await req.json();
            const validacion = horarioSchema.safeParse(body);
            if (!validacion.success) {
     return NextResponse.json(
       { error: "Datos inválidos", detalles: validacion.error.format() },
       { status: 400 }
     );
   }
  const permiso = await registroHorario(validacion.data);
          /* const permiso = await registroHorario(validacion.data);
         return NextResponse.json(permiso); */
     } catch (error) {
         return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
     }

}