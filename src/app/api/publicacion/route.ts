import { NextResponse } from "next/server";
import { registroPublicacion} from '@/services/backend/publicacionServices'
import { publicacionSchema } from '@/schemas/publicacionSchema'


export async function POST(req: Request) {
  const body = await req.json();
  const validacion = publicacionSchema.safeParse(body);
  console.log("sssssssssssss")
  console.log(validacion)
  if (!validacion.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: validacion.error.format() },
      { status: 400 }
    );
  }
 
  try {
    const resultado = await registroPublicacion(validacion.data);
    console.log("USUARIO REGISTRADO CON EXITO")
    return NextResponse.json({ mensaje: "Usuario registrado", resultado });
  } catch (error: any) {
    console.log("error al registrar el usuario")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
