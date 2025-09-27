import { NextResponse } from "next/server";
import { registroGrupo} from '@/services/backend/grupoServices'
import { grupoSchema } from '@/schemas/grupoSchema'


export async function POST(req: Request) {
  const body = await req.json();
  const validacion = grupoSchema.safeParse(body);
  if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
 
  try {
    const resultado = await registroGrupo(validacion.data);
    console.log("USUARIO REGISTRADO CON EXITO")
    return NextResponse.json({ mensaje: "Usuario registrado", resultado });
  } catch (error: any) {
    console.log("error al registrar el usuario")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
