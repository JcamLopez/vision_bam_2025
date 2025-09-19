
import { NextResponse } from "next/server";
import { registrarUsuario} from '@/services/backend/usuarioServices'
import { usuarioSchema } from '@/schemas/usuarioSchema'
export async function POST(req: Request) {
  const body = await req.json();
  const validacion = usuarioSchema.safeParse(body);
  if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
 
  try {
    const resultado = await registrarUsuario(validacion.data);
    console.log("USUARIO REGISTRADO CON EXITO")
    return NextResponse.json({ mensaje: "Usuario registrado", resultado });
  } catch (error: any) {
    console.log("error al registrar el usuario")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}

